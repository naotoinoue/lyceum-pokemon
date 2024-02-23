import { Router } from "express";
import { findTrainers, upsertTrainer, getTrainer } from "~/server/utils/trainer";
import { findPokemon } from "~/server/utils/pokemon";

const router = Router();

router.get("/hello", (_req, res) => {
  res.send("Hello World");
});

/** トレーナー名の一覧の取得 */
router.get("/trainers", async (_req, res, next) => {
  try {
    const trainers = await findTrainers();
    console.log(trainers);
    // TODO: 期待するレスポンスボディに変更する
    const trainerNames = trainers.map((item) => {
      const traineName = item.Key.replace(".json", "");
      return traineName
    });
    // TODO END
    res.send(trainerNames);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの追加 */
router.post("/trainer", async (req, res, next) => {
  try {
    console.log("/trainer body :"+JSON.stringify(req.body));
    console.log(typeof req.body.name);
    // TODO: リクエストボディにトレーナー名が含まれていなければ400を返す
    if(typeof req.body.name == 'undefined'){
      res.status(400).send("name is NOT defined");
    }
    // RequestBodyにトレーナー名が含まれている場合
    else{
      // トレーナーリストを取得する
      const trainers = await findTrainers();
      const trainerNames = trainers.map((item) => {
        return item.Key
      });
      // TODO: すでにトレーナー（S3 オブジェクト）が存在していれば409を返す
      if(trainerNames.includes(req.body.name+".json")){
        res.status(409).send(req.body.name + " is ALREADY defined");
      }
      else{
        const result = await upsertTrainer(req.body.name, req.body);
        res.status(result["$metadata"].httpStatusCode).send(result);        
      }
    }
  } catch (err) {
    next(err);
  }
});

/** トレーナーの取得 */
// TODO: トレーナーを取得する API エンドポイントの実装
router.get("/trainer/:trainerName", async (req, res, next)=>{
  try {
    const result = await getTrainer(req.params.trainerName);
    res.send(result);
  } catch(err){
    next(err);
  }

});

/** トレーナーの更新 */
router.post("/trainer/:trainerName", async (req, res, next) => {
  try {
    const { trainerName } = req.params;

    // トレーナーリストを取得する
    const trainers = await findTrainers();
    const trainerNames = trainers.map((item) => {
      return item.Key
    });
    // トレーナーが存在すれば更新
    if(trainerNames.includes(trainerName+".json")){
      const result = await upsertTrainer(trainerName, req.body);
      res.status(result["$metadata"].httpStatusCode).send(result);
    }
    // TODO: トレーナーが存在していなければ404を返す
    else{
      res.status(404).send(trainerName + " does NOT exist");
    }
  } catch (err) {
    next(err);
  }
});

/** トレーナーの削除 */
// TODO: トレーナーを削除する API エンドポイントの実装

/** ポケモンの追加 */
// Body : {name : pikachu}
router.post("/trainer/:trainerName/pokemon", async (req, res, next) => {
  console.log("/trainer/"+req.params.traineName+"/pokemon");
  try {
    // トレーナー情報取得
    const { trainerName } = req.params;
    let trainer = await getTrainer(trainerName);
    console.log("trainer : "+trainer);

    // ポケモン情報取得
    // TODO: リクエストボディにポケモン名が含まれていなければ400を返す
    if(!("name" in req.body)){
      console.log("name is null ");
      res.status(400).send("name property does NOT exist");
    }
    const pokemonFromPokeAPI = await findPokemon(req.body.name);
    const pokemon = {
      "id":pokemonFromPokeAPI.id,
      "nickname":"",
      "order":pokemonFromPokeAPI.order,
      "name":pokemonFromPokeAPI.name,
      "sprites":{
        "front_default":pokemonFromPokeAPI.sprites.front_default
      }
    };
    trainer = JSON.parse(trainer);

    // トレーナーの手持ちポケモンにポケモンを追加
    trainer.pokemons.push(pokemon);

    // TODO: 削除系 API エンドポイントを利用しないかぎりポケモンは保持する
    const result = await upsertTrainer(trainerName, trainer);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    next(err);
  }
});

/** ポケモンの削除 */
// TODO: ポケモンを削除する API エンドポイントの実装

export default router;
