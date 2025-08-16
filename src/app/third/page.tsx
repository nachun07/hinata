"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function ThirdPage() {
  const [text, setText] = useState("");
  const [seconds, setSeconds] = useState(0);
  const timerId = useRef<number | undefined>(undefined);
  const [emoji, setEmoji] = useState("");
  const [qrText, setQrText] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [cssColor, setCssColor] = useState("#3498db");
  const [cssCode, setCssCode] = useState("");
  const [username, setUsername] = useState("");

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

  // パスワード生成
  const generatePassword = () => {
    const length = 12;
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    checkPasswordStrength(pass);
  };

  // パスワード強度チェック
  const checkPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let strength = "";
    switch (score) {
      case 5:
        strength = "超強力 🔥🔥🔥";
        break;
      case 4:
        strength = "強力 💪💪";
        break;
      case 3:
        strength = "普通 👍";
        break;
      case 2:
        strength = "弱い ⚠️";
        break;
      default:
        strength = "非常に弱い ❌";
    }
    setPasswordStrength(strength);
  };

  // パスワードをクリップボードにコピー
  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    alert("パスワードをコピーしました！");
  };

  // CSSコードジェネレーター
  const generateCssCode = () => {
    const code = `background-color: ${cssColor};\ncolor: white;\npadding: 10px;\nborder-radius: 5px;`;
    setCssCode(code);
  };

  // ユーザー名ジェネレーター
  const generateUsername = () => {
    const adjectives = [
      "Swift",
      "Silent",
      "Crazy",
      "Bright",
      "Funky",
      "Sly",
      "Wild",
      "Lucky",
      "Brave",
      "Cool",
    ];
    const nouns = [
      "Tiger",
      "Ninja",
      "Wizard",
      "Shadow",
      "Dragon",
      "Samurai",
      "Ranger",
      "Ghost",
      "Pirate",
      "Knight",
    ];
    const number = Math.floor(Math.random() * 1000);
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const newUsername = `${adj}${noun}${number}`;
    setUsername(newUsername);
  };

  // アンマウント時にタイマー停止
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="p-8 max-w-md mx-auto flex flex-col min-h-screen space-y-8">
      {/* 翻訳 */}
      <div>
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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Google翻訳で開く
        </button>
      </div>

      {/* タイマー */}
      <div>
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
      <div>
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
      <div>
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

      {/* パスワードジェネレーター */}
      <div>
        <h2 className="font-semibold mb-2">パスワードジェネレーター</h2>
        <button
          onClick={generatePassword}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          パスワードを生成
        </button>
        {password && (
          <div className="mt-3 flex items-center justify-between gap-3 border border-gray-300 rounded p-3 bg-gray-50">
            <input
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              className="flex-grow bg-transparent border-none outline-none break-all"
            />
            <button
              onClick={copyPassword}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              コピー
            </button>
          </div>
        )}
        {password && (
          <p className="mt-2 text-sm font-semibold">
            強度: {passwordStrength}
          </p>
        )}
      </div>

      {/* CSSコードジェネレーター */}
      <div>
        <h2 className="font-semibold mb-2">CSSコードジェネレーター</h2>
        <input
          type="color"
          value={cssColor}
          onChange={(e) => setCssColor(e.target.value)}
          className="mb-3 w-full h-10 border border-gray-300 rounded"
        />
        <button
          onClick={generateCssCode}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          CSSコードを生成
        </button>
        {cssCode && (
          <pre className="mt-3 p-3 bg-gray-100 rounded whitespace-pre-wrap">
            {cssCode}
          </pre>
        )}
      </div>

      {/* ユーザー名ジェネレーター */}
      <div>
        <h2 className="font-semibold mb-2">ユーザー名ジェネレーター</h2>
        <button
          onClick={generateUsername}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          ユーザー名を生成
        </button>
        {username && (
          <p className="mt-3 text-xl text-center font-mono select-all">{username}</p>
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