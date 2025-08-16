"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ThirdPage() {
  const [text, setText] = useState("");
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef<number | undefined>(undefined);
  const [emoji, setEmoji] = useState("");
  const [qrText, setQrText] = useState("");

  // タイマー開始
  const startTimer = () => {
    if (timerId.current !== undefined) return;
    timerId.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // タイマー停止
  const stopTimer = () => {
    if (timerId.current !== undefined) {
      clearInterval(timerId.current);
      timerId.current = undefined;
    }
  };

  // タイマーリセット
  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
  };

  // Google翻訳に飛ぶ
  const handleTranslate = () => {
    if (!text.trim()) {
      alert("翻訳したいテキストを入力してください");
      return;
    }
    const url = `https://translate.google.com/?sl=ja&tl=en&text=${encodeURIComponent(
      text
    )}&op=translate`;
    window.open(url, "_blank");
  };

  // 顔文字生成（ランダム）
  const generateEmoji = () => {
    const emojis = ["(๑˃̵ᴗ˂̵)و", "( ˘ω˘ )", "(╯°□°）╯︵ ┻━┻", "٩( 'ω' )و", "(｡･ω･｡)ﾉ♡"];
    const random = Math.floor(Math.random() * emojis.length);
    setEmoji(emojis[random]);
  };

  // アンマウント時にタイマー停止
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="p-8 max-w-md mx-auto flex flex-col min-h-screen">
      <h1 className="text-xl font-bold mb-4">日本語 → 英語 翻訳</h1>
      <textarea
        rows={4}
        className="w-full border border-gray-300 rounded p-2 mb-4"
        placeholder="ここに日本語を入力してください"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleTranslate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-6"
      >
        Google翻訳で開く
      </button>

      {/* タイマー */}
      <div className="mb-6">
        <p className="mb-2 text-lg font-semibold">タイマー: {seconds} 秒</p>
        <div className="flex gap-2">
          <button
            onClick={startTimer}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            開始
          </button>
          <button
            onClick={stopTimer}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            停止
          </button>
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            リセット
          </button>
        </div>
      </div>

      {/* 顔文字ジェネレーター */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">顔文字ジェネレーター</h2>
        <button
          onClick={generateEmoji}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          顔文字を生成
        </button>
        <p className="mt-3 text-2xl text-center">{emoji}</p>
      </div>

      {/* QRコードジェネレーター */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">QRコードジェネレーター</h2>
        <input
          type="text"
          value={qrText}
          onChange={(e) => setQrText(e.target.value)}
          placeholder="QRコードにしたいテキスト"
          className="w-full border border-gray-300 rounded p-2 mb-3"
        />
        {qrText && (
          <div className="flex justify-center">
            <QRCodeSVG value={qrText} size={128} />
          </div>
        )}
      </div>

      {/* ページ遷移 */}
      <div className="mt-auto flex flex-col gap-3">
        <a
          href="/"
          className="text-center px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
        >
          1ページ目に戻る
        </a>
        <a
          href="/second"
          className="text-center px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-100"
        >
          2ページ目に戻る
        </a>
      </div>
    </div>
  );
}
