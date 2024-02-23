import { GetObjectCommand, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

const config = useRuntimeConfig();

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

/** トレーナーの一覧の取得 */
export const findTrainers = async () => {
  console.log("config.buketName : "+config.bucketName);
  const objects = await s3Client.send(
    new ListObjectsCommand({ Bucket: config.bucketName }),
  );
  return objects.Contents ?? [];
};

/** トレーナーの取得 */
// TODO: トレーナーを取得する S3 クライアント処理の実装
export const getTrainer = async(trainer) => {
  const object = await s3Client.send(
    new GetObjectCommand({
      Bucket:config.bucketName,
      Key:trainer+".json"
    })
  )
  return object.Body.transformToString();
}


/** トレーナーの追加更新 */
// trainerはnameとpokemonsを含むオブジェクト
// name : jsonファイルのキーとして使われる
// trainer : trainerオブジェクト(name, pokemons)の更新に使われる
// 空の情報をtrainerで上書きしているため、trainerに全ての情報を含む必要あり
export const upsertTrainer = async (name, trainer) => {
  const result = await s3Client.send(
    new PutObjectCommand({
      Bucket: config.bucketName,
      Key: `${name}.json`,
      Body: JSON.stringify({ name: "", pokemons: [], ...trainer }),
    }),
  );
  console.log("PubObjectCommand result: "+JSON.stringify(result));
  return result;
};

/** トレーナーの削除 */
// TODO: トレーナーを削除する S3 クライアント処理の実装
