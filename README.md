# Darekx14 Exercising App

A desktop version of your push-up circuit tracker, built with Electron.
Shows "Darekx14 exercising app" on your Discord profile automatically
the moment you open it (as long as Discord desktop is running).

## 1. Install dependencies (one time)

Open a terminal in this folder and run:

```
npm install
```

This downloads Electron and the Discord RPC library. It's a few hundred MB —
only needs to happen once.

## 2. Try it out first (no packaging needed)

```
npm start
```

This launches the app immediately in a window, using your installed Node/Electron.
Open Discord desktop first if you want to see the Rich Presence status appear.

## 3. Build real executables — for both Linux and Windows

The easiest and most reliable way to get **both** a Linux AppImage and a
Windows `.exe` is to let GitHub build them for you — it runs the Linux
build on a real Linux machine and the Windows build on a real Windows
machine in the cloud, so nothing has to cross-compile.

### One-time setup

1. Create a free GitHub account if you don't have one: https://github.com/join
2. Create a new empty repository (e.g. `darekx14-pushup-app`), don't add a README.
3. In this folder, run:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/darekx14-pushup-app.git
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username.)

### Getting your builds

The `.github/workflows/build.yml` file included in this project tells
GitHub to automatically build both platforms every time you push. After
the push above:

1. Go to your repo on github.com → click the **Actions** tab.
2. You'll see a "Build Desktop App" run in progress (takes a few minutes).
3. Once it's green, click into the run → scroll to **Artifacts** at the
   bottom → download `darekx14-pushup-app-linux` and
   `darekx14-pushup-app-windows`.
4. Unzip what you downloaded:
   - Linux: `chmod +x *.AppImage` then double-click or run it directly.
   - Windows: just run the `.exe` — no install needed for the portable one.

Any time you make changes and want new builds, just `git add .`,
`git commit`, `git push` again — it rebuilds both automatically.

### Building locally instead (optional, not required)

If you'd rather not use GitHub:

```
npm run dist:linux
```

works directly on Fedora and produces `dist/*.AppImage`.

```
npm run dist:win
```

only works reliably on an actual Windows machine, or on Linux with Wine
installed — cross-building Windows installers from Linux without Wine
will fail.


## Notes

- Your Client ID is already filled in inside `main.js` (`DISCORD_CLIENT_ID`).
- If Discord desktop isn't open, the app still runs fine — it just won't show
  on your profile. Nothing crashes.
- Your workout progress, start date, and YouTube link are now saved using
  real browser storage (`localStorage`) inside the app, separate from
  Claude's system — so it works fully offline as a standalone app.
- To change what a re-open of the app announces, edit the `state` /
  `updateActivity(...)` calls in `main.js`.
