function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-white">
            InterviewAI 🚀
          </h2>

          <p className="mt-2 text-slate-400">
            Helping students crack interviews with AI.
          </p>
        </div>

        <div className="flex gap-8 text-slate-400">
          <a href="#" className="hover:text-blue-400">
            Home
          </a>

          <a href="#" className="hover:text-blue-400">
            Features
          </a>

          <a href="#" className="hover:text-blue-400">
            Contact
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        © 2026 InterviewAI. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;