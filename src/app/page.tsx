"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [likeCount, setLikeCount] = useState(0);
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [error, setError] = useState("");

  // じゃんけん用 state
  const [userHand, setUserHand] = useState("");
  const [cpuHand, setCpuHand] = useState("");
  const [result, setResult] = useState("");

  // Qiita記事一覧（タイトル＋URL）
  const [qiitaArticles, setQiitaArticles] = useState<any[]>([]);

  const handleHelloWorld = () => {
    console.log("Hello world");
  };

  const handleConfirm = () => {
    confirm("Hello world");
  };

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
  };

  const handleDislike = () => {
    setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleReset = () => {
    setLikeCount(0);
  };

  const handleHelloButtonClick = () => {
    if (inputText.trim() === "") {
      setError("何か文字を入力してください。");
      setDisplayText("");
    } else {
      setDisplayText(inputText);
      setError("");
    }
  };

  const cpuHands = ["ぐー", "ちょき", "ぱー"];
  const getRandomCpuHand = () => {
    const index = Math.floor(Math.random() * cpuHands.length);
    return cpuHands[index];
  };

  const judgeResult = (user: string, cpu: string) => {
    if (user === cpu) return "あいこです。";
    if (
      (user === "ぐー" && cpu === "ちょき") ||
      (user === "ちょき" && cpu === "ぱー") ||
      (user === "ぱー" && cpu === "ぐー")
    ) {
      return "勝ちです。";
    }
    return "負けです。";
  };

  const handleUserHandClick = (hand: string) => {
    const cpuChoice = getRandomCpuHand();
    setUserHand(hand);
    setCpuHand(cpuChoice);
    setResult(judgeResult(hand, cpuChoice));
  };

  // Qiita記事取得
  useEffect(() => {
    const fetchQiitaArticles = async () => {
      try {
        const res = await fetch("https://qiita.com/api/v2/items?page=1&per_page=10");
        const data = await res.json();
        setQiitaArticles(data);
      } catch (error) {
        console.error("Qiita記事の取得に失敗しました", error);
      }
    };

    fetchQiitaArticles();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            hello{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              sensei
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>

        <button
          onClick={handleHelloWorld}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Hello world をコンソールに表示
        </button>

        <button
          onClick={handleConfirm}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          アラート（確認ダイアログ）を表示
        </button>

        {/* いいね関連 */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handleLike}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            いいね！
          </button>
          <button
            onClick={handleDislike}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            よくないね！
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            reset
          </button>
          <span className="ml-2 font-semibold">{likeCount}</span>
        </div>

        {/* 文字入力＋helloボタン */}
        <div className="mt-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="文字を入力してください"
              className="border border-gray-300 rounded px-3 py-1"
            />
            <button
              onClick={handleHelloButtonClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              hello
            </button>
            <span className="ml-4 font-medium">{displayText}</span>
          </div>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        {/* じゃんけん */}
        <div className="mt-6 flex items-center gap-4">
          {["ぐー", "ちょき", "ぱー"].map((hand) => (
            <button
              key={hand}
              onClick={() => handleUserHandClick(hand)}
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
            >
              {hand}
            </button>
          ))}
        </div>

        <div className="mt-4 text-lg">
          <p>
            あなたの手：<span className="font-semibold">{userHand}</span>
          </p>
          <p>
            CPUの手：<span className="font-semibold">{cpuHand}</span>
          </p>
          <p>
            勝敗：<span className="font-semibold">{result}</span>
          </p>
        </div>

        {/* Qiita記事リンク付きタイトル一覧 */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2">最新のQiita記事</h2>
          <ul className="list-disc list-inside text-left">
            {qiitaArticles.length > 0 ? (
              qiitaArticles.map((article, index) => (
                <li key={index}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {article.title}
                  </a>
                </li>
              ))
            ) : (
              <li>読み込み中...</li>
            )}
          </ul>
        </div>

        {/* 2ページ目へ */}
        <Link href="/second">
          <button className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            2ページ目へ
          </button>
        </Link>

        {/* 3ページ目へ */}
        <Link href="/third">
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            3ページ目へ
          </button>
        </Link>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
