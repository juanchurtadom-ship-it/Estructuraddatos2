:host { display: block; min-height: 100vh; }
.auth-page { min-height: 100vh; display: grid; place-items: center; padding: 32px 18px; background: #101014; color: #f7f7f8; font-family: 'DM Sans', Arial, sans-serif; }
.auth-card { width: min(100%, 440px); padding: 42px; border: 1px solid #292831; border-radius: 22px; background: #19191f; box-shadow: 0 24px 70px #0005; }
.brand { display: inline-block; margin-bottom: 34px; color: #fff; font-size: 27px; font-weight: 800; text-decoration: none; letter-spacing: -1px; }
.brand span { color: #ff873d; }
.eyebrow { margin: 0 0 10px; color: #ff873d; font-size: 11px; font-weight: 800; letter-spacing: 1.7px; }
h1 { margin: 0; font-size: 34px; }
.subtitle { margin: 9px 0 28px; color: #a9a8b2; }
form { display: grid; gap: 11px; }
label { margin-top: 8px; color: #e4e2e9; font-size: 13px; font-weight: 700; }
input { width: 100%; box-sizing: border-box; padding: 14px 15px; border: 1px solid #35343d; border-radius: 11px; outline: none; background: #111116; color: #fff; font: inherit; }
input:focus { border-color: #ff873d; }
button { margin-top: 13px; padding: 14px; border: 0; border-radius: 11px; background: #ff873d; color: #171317; font: inherit; font-weight: 800; cursor: pointer; }
button:disabled { opacity: .45; cursor: not-allowed; }
.error-message { margin: 5px 0 0; color: #ff8f8f; font-size: 13px; }
.switch-link, .back-link { color: #aaa9b3; font-size: 13px; text-align: center; }
.switch-link { margin: 24px 0 17px; }
a:not(.brand) { color: #ff9b5e; text-decoration: none; }
.back-link { display: block; }
@media (max-width: 480px) { .auth-card { padding: 30px 23px; } }
