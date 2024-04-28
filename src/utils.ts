import { KaboomCtx } from "kaboom";
import { scale } from "./constants";

// マップ情報のファイル名を渡してステージを作成する
export const makeMap = async (k: KaboomCtx, name: string) => {
  // jsonファイルをobject化
  const mapData = await (await fetch(`./${name}.json`)).json();

  const map = k.make([k.sprite(name), k.scale(scale), k.pos(0)]);

  const spawnPoints: { [key: string]: { x: number; y: number }[] } = {};

  for (const layer of mapData.layers) {
    if (layer.name === "colliders") {
      for (const collider of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), collider.width, collider.height),
            collisionIgnore: ["platform", "exit"],
          }),
          collider.name !== "exit" ? k.body({ isStatic: true }) : null,
          k.pos(collider.x, collider.y),
          collider.name !== "exit" ? "platform" : "exit",
        ]);
      }
      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const spawnPoint of layer.objects) {
        if (spawnPoints[spawnPoint.name]) {
          spawnPoints[spawnPoint.name].push({
            x: spawnPoint.x,
            y: spawnPoint.y,
          });
          continue;
        }

        spawnPoints[spawnPoint.name] = [{ x: spawnPoint.x, y: spawnPoint.y }];
      }
    }
  }
  // { map: map, spawnPoints: spawnPoints}の省略記法
  return { map, spawnPoints };
};
