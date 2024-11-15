"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="mx-auto flex h-screen max-w-md flex-col justify-center bg-slate-50 text-center font-mPlus">
      {/* 新規登録 */}
      <div className="items-center">
        <h1 className="text-4xl text-color-all">新規登録</h1>
        <h2 className="m-3 pb-7 text-base text-gray-700">
          初めての方は<br></br>こちらからGoogleアカウントを使用して<br></br>
          新規登録してください
        </h2>
        {/*
              「Sign up with Google」ボタン
              https://developers.google.com/identity/branding-guidelines?hl=ja#font のHTMLコードを
              https://transform.tools/html-to-jsx で変換した。
          */}
        <button
          className="gsi-material-button"
          onClick={() => signIn("google", { callbackUrl: "/question" })}
        >
          <div className="gsi-material-button-state" />
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{ display: "block" }}
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            </div>
            <span className="gsi-material-button-contents">
              Sign up with Google
            </span>
            <span style={{ display: "none" }}>Sign up with Google</span>
          </div>
        </button>
      </div>

      <hr className="m-16 mx-auto h-1 w-10/12 rounded border-0 bg-color-all dark:bg-gray-700 md:my-10"></hr>

      {/* ログイン */}
      <div className="items-center">
        <h1 className="pt-4 text-4xl text-color-all">ログイン</h1>
        <h2 className="m-3 pb-7 text-text-gray-700">
          既に登録済みの方は、<br></br>こちらからGoogleアカウントを使用して
          <br></br>ログインしてください
        </h2>
        {/*
              「Sign in with Google」ボタン
              https://developers.google.com/identity/branding-guidelines?hl=ja#font のHTMLコードを
              https://transform.tools/html-to-jsx で変換した。
          */}
        <button
          className="gsi-material-button"
          onClick={() => signIn("google", { callbackUrl: "/home" })}
        >
          <div className="gsi-material-button-state" />
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{ display: "block" }}
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            </div>
            <span className="gsi-material-button-contents">
              Sign in with Google
            </span>
            <span style={{ display: "none" }}>Sign in with Google</span>
          </div>
        </button>
      </div>
    </div>
  );
}
