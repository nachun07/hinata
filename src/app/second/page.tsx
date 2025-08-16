"use client";

import { useState } from "react";
import Link from "next/link";

export default function SecondPage() {
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");

  // YYYY-MM-DD形式の簡単なバリデーションだけ残す
  const isValidDate = (dateStr: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDate(birthday)) {
      setError("有効な誕生日を「YYYY-MM-DD」形式で入力してください");
      return;
    }
    setError("");

    // 月日をMMDD形式で取り出す（年は無視）
    const mmdd = birthday.slice(5, 10).replace("-", "");

    const url = `http://birthday-color.cafein.jp/html/${mmdd}.html`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold mb-4">誕生日カラー診断</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        <label htmlFor="birthday" className="font-medium">
          誕生日を入力してください (YYYY-MM-DD)
        </label>
        <input
          type="date"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
          required
          // max 属性は外して未来日も入力可能に
          // max={new Date().toISOString().split("T")[0]}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          診断ページへ
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>

      <div className="mt-8 flex gap-4">
        {/* 1ページ目へ戻る */}
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            1ページ目へ戻る
          </button>
        </Link>

        {/* 3ページ目へ */}
        <Link href="/third">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            3ページ目へ
          </button>
        </Link>
      </div>
    </div>
  );
}
