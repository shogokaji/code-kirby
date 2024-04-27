import { k } from "./kaboomCtx";

const gameSetup = async () => {
  k.loadSprite("assets", "./kirby-like.png", {
    sliceX: 9, // assetsのx軸のアイテム数
    sliceY: 10, // assetsのy軸のアイテム数
    // アニメーションをassetsとマッピングする
    anims: {
      kirbIdle: 0, // asettsの1行目のキャラクターの状態をindexで指定
      kirbInhaling: 1, // asettsの1行目のindex1番目（空気を吸うアクション）
      kirbFull: 2,
      kirbInhaleEffect: { from: 3, to: 8, speed: 15, loop: true }, // 複数のアクションがある場合はオブジェクトで指定
      shootingStar: 9,
      flame: { from: 36, to: 37, speed: 4, loop: true },
      guyIdle: 18,
      guyWalk: { from: 18, to: 19, speed: 4, loop: true },
      bird: { from: 27, to: 28, speed: 4, loop: true },
    },
  });

  k.loadSprite("level-1", "./level-1.png");

  k.scene("level-1", () => {
    k.setGravity(2100);
    k.add([
      k.rect(k.width(), k.height()),
      k.color(k.Color.fromHex("#f7d7db")),
      k.fixed(),
    ]);
  });

  k.go("level-1");
};

gameSetup();
