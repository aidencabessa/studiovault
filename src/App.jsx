import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════════ */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg:#07070f; --surface:#0d0d1c; --surface2:#131325; --surface3:#1a1a30;
    --accent:#e8a020; --accent-glow:rgba(232,160,32,.18); --accent-dim:rgba(232,160,32,.09);
    --text:#ddddf2; --text-muted:#58588a; --border:#18183a; --border-hover:#2c2c50;
    --code-bg:#05050e; --green:#50e3a4; --blue:#4a9eff; --red:#ef5350;
  }
  html { scroll-behavior:smooth; }
  body { background:var(--bg); color:var(--text); font-family:'DM Sans',sans-serif; min-height:100vh; -webkit-font-smoothing:antialiased; }

  .nav { position:sticky; top:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 2rem; height:58px; background:rgba(7,7,15,.88); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); }
  .nav-left { display:flex; align-items:center; gap:12px; }
  .nav-logo { display:flex; align-items:center; gap:9px; font-family:'Syne',sans-serif; font-weight:800; font-size:1.1rem; color:var(--text); text-decoration:none; cursor:pointer; }
  .logo-box { width:30px; height:30px; background:var(--accent); border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:15px; }
  .nav-pill { background:var(--accent-dim); color:var(--accent); border:1px solid rgba(232,160,32,.18); font-size:.68rem; font-weight:500; letter-spacing:.07em; text-transform:uppercase; padding:3px 9px; border-radius:100px; }
  .nav-tabs { display:flex; gap:4px; }
  .nav-tab { background:transparent; border:1px solid transparent; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:.82rem; font-weight:500; color:var(--text-muted); padding:6px 14px; cursor:pointer; transition:all .15s; }
  .nav-tab:hover { color:var(--text); border-color:var(--border); }
  .nav-tab.active { background:var(--accent-dim); color:var(--accent); border-color:rgba(232,160,32,.25); }
  .tab-badge { background:var(--accent); color:#000; font-size:.6rem; font-weight:700; padding:1px 5px; border-radius:100px; margin-left:5px; }

  .hero { position:relative; padding:80px 2rem 60px; text-align:center; overflow:hidden; }
  .hero-grid { position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(rgba(232,160,32,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(232,160,32,.025) 1px,transparent 1px); background-size:44px 44px; mask-image:radial-gradient(ellipse 80% 65% at 50% 0%,black,transparent); }
  .hero-glow { position:absolute; top:-40px; left:50%; transform:translateX(-50%); width:700px; height:320px; pointer-events:none; background:radial-gradient(ellipse,rgba(232,160,32,.07) 0%,transparent 65%); }
  .hero-eyebrow { position:relative; z-index:1; display:inline-flex; align-items:center; gap:6px; background:var(--accent-dim); border:1px solid rgba(232,160,32,.14); color:var(--accent); font-size:.72rem; font-weight:500; letter-spacing:.09em; text-transform:uppercase; padding:4px 13px; border-radius:100px; margin-bottom:22px; }
  .hero-dot { width:6px; height:6px; background:var(--accent); border-radius:50%; animation:pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .hero-title { position:relative; z-index:1; font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(2.2rem,5vw,3.5rem); line-height:1.08; letter-spacing:-.025em; color:var(--text); margin-bottom:16px; }
  .hero-title em { color:var(--accent); font-style:normal; }
  .hero-sub { position:relative; z-index:1; font-size:1rem; color:var(--text-muted); font-weight:300; max-width:440px; margin:0 auto 38px; line-height:1.6; }
  .search-wrap { position:relative; max-width:500px; margin:0 auto; z-index:1; }
  .search-ico { position:absolute; left:15px; top:50%; transform:translateY(-50%); color:var(--text-muted); font-size:.9rem; pointer-events:none; }
  .search-input { width:100%; background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:13px 16px 13px 42px; font-family:'DM Sans',sans-serif; font-size:.93rem; color:var(--text); outline:none; transition:border-color .2s,box-shadow .2s; }
  .search-input::placeholder { color:var(--text-muted); }
  .search-input:focus { border-color:rgba(232,160,32,.4); box-shadow:0 0 0 3px rgba(232,160,32,.07); }

  .stats-bar { display:flex; align-items:center; justify-content:center; gap:32px; padding:28px 2rem 0; }
  .stat { text-align:center; }
  .stat-num { font-family:'Syne',sans-serif; font-weight:800; font-size:1.4rem; color:var(--accent); }
  .stat-lbl { font-size:.75rem; color:var(--text-muted); margin-top:2px; }
  .stat-div { width:1px; height:32px; background:var(--border); }

  .cats-wrap { padding:28px 2rem 24px; max-width:1200px; margin:0 auto; }
  .cats-label { font-size:.7rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:var(--text-muted); margin-bottom:12px; }
  .cats { display:flex; gap:7px; flex-wrap:wrap; }
  .cat-pill { background:var(--surface); border:1px solid var(--border); color:var(--text-muted); font-family:'DM Sans',sans-serif; font-size:.8rem; font-weight:500; padding:6px 14px; border-radius:100px; cursor:pointer; transition:all .15s; white-space:nowrap; }
  .cat-pill:hover { border-color:var(--border-hover); color:var(--text); }
  .cat-pill.active { background:var(--accent-dim); border-color:rgba(232,160,32,.3); color:var(--accent); }

  .grid-section { max-width:1200px; margin:0 auto; padding:0 2rem 80px; }
  .grid-meta { display:flex; align-items:center; margin-bottom:18px; }
  .grid-count { font-size:.78rem; color:var(--text-muted); }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(340px,1fr)); gap:14px; }

  .card { background:var(--surface); border:1px solid var(--border); border-radius:14px; overflow:hidden; transition:border-color .2s,transform .18s,box-shadow .18s; }
  .card:hover { border-color:var(--border-hover); transform:translateY(-2px); box-shadow:0 10px 36px rgba(0,0,0,.35); }
  .card-header { padding:18px 18px 0; }
  .card-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; gap:6px; }
  .card-badges { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
  .cat-badge { font-size:.67rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase; padding:3px 9px; border-radius:100px; border:1px solid transparent; }
  .diff-badge { font-size:.67rem; font-weight:600; letter-spacing:.04em; padding:3px 8px; border-radius:100px; }
  .diff-beginner { background:rgba(80,227,164,.1); color:#50e3a4; border:1px solid rgba(80,227,164,.2); }
  .diff-intermediate { background:rgba(232,160,32,.09); color:#e8a020; border:1px solid rgba(232,160,32,.2); }
  .diff-advanced { background:rgba(239,83,80,.1); color:#ef5350; border:1px solid rgba(239,83,80,.2); }
  .placement { font-family:'JetBrains Mono',monospace; font-size:.62rem; color:var(--text-muted); background:var(--surface2); border:1px solid var(--border); padding:3px 8px; border-radius:6px; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex-shrink:0; }
  .card-title { font-family:'Syne',sans-serif; font-weight:700; font-size:.97rem; color:var(--text); margin-bottom:5px; }
  .card-desc { font-size:.83rem; color:var(--text-muted); line-height:1.55; padding-bottom:14px; }
  .card-actions { display:flex; gap:7px; padding:11px 18px 14px; border-top:1px solid var(--border); }
  .btn { display:inline-flex; align-items:center; gap:5px; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:.78rem; font-weight:500; padding:7px 13px; cursor:pointer; transition:all .15s; border:1px solid transparent; }
  .btn-ghost { background:transparent; border-color:var(--border); color:var(--text-muted); }
  .btn-ghost:hover { border-color:var(--border-hover); color:var(--text); }
  .btn-accent { background:var(--accent-dim); border-color:rgba(232,160,32,.22); color:var(--accent); }
  .btn-accent:hover { background:rgba(232,160,32,.16); }
  .btn-green { background:rgba(80,227,164,.1); border-color:rgba(80,227,164,.25); color:#50e3a4; }
  .btn-blue { background:rgba(74,158,255,.1); border-color:rgba(74,158,255,.25); color:#4a9eff; }
  .code-wrap { overflow:hidden; max-height:0; transition:max-height .32s cubic-bezier(.4,0,.2,1); }
  .code-wrap.open { max-height:520px; border-top:1px solid var(--border); }
  .code-inner { background:var(--code-bg); padding:16px 18px; overflow-x:auto; overflow-y:auto; max-height:440px; }
  .code-inner pre { font-family:'JetBrains Mono',monospace; font-size:.73rem; line-height:1.75; color:#8888c0; white-space:pre; }
  .code-kw{color:#e8a020}.code-bi{color:#4a9eff}.code-str{color:#50e3a4}.code-cm{color:#404060;font-style:italic}.code-nm{color:#f06292}

  .empty { grid-column:1/-1; text-align:center; padding:64px 20px; color:var(--text-muted); }
  .empty-ico { font-size:2.4rem; margin-bottom:10px; opacity:.4; }

  /* AI FIXER */
  .fixer-wrap { max-width:860px; margin:0 auto; padding:40px 2rem 80px; }
  .fixer-hero { text-align:center; margin-bottom:36px; }
  .fixer-hero h2 { font-family:'Syne',sans-serif; font-weight:800; font-size:2rem; color:var(--text); margin-bottom:10px; }
  .fixer-hero h2 em { color:var(--accent); font-style:normal; }
  .fixer-hero p { color:var(--text-muted); font-size:.95rem; max-width:500px; margin:0 auto; line-height:1.6; }
  .fixer-box { background:var(--surface); border:1px solid var(--border); border-radius:16px; overflow:hidden; }
  .fixer-label { padding:16px 20px 8px; font-size:.72rem; font-weight:500; letter-spacing:.09em; text-transform:uppercase; color:var(--text-muted); }
  .fixer-textarea { width:100%; background:transparent; border:none; border-top:1px solid var(--border); padding:16px 20px; font-family:'JetBrains Mono',monospace; font-size:.78rem; line-height:1.7; color:var(--text); resize:none; outline:none; min-height:240px; }
  .fixer-textarea::placeholder { color:var(--text-muted); }
  .fixer-actions { display:flex; align-items:center; justify-content:space-between; padding:12px 20px; border-top:1px solid var(--border); gap:10px; flex-wrap:wrap; }
  .fixer-hint { font-size:.78rem; color:var(--text-muted); }
  .btn-fix { background:var(--accent); color:#000; border:none; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:.88rem; font-weight:700; padding:10px 22px; cursor:pointer; transition:opacity .15s; display:flex; align-items:center; gap:7px; }
  .btn-fix:disabled { opacity:.5; cursor:not-allowed; }
  .btn-fix:not(:disabled):hover { opacity:.88; }

  .results { margin-top:24px; display:flex; flex-direction:column; gap:16px; }
  .result-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; overflow:hidden; }
  .result-header { padding:14px 18px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:8px; }
  .result-icon { font-size:1rem; }
  .result-title { font-family:'Syne',sans-serif; font-weight:700; font-size:.9rem; color:var(--text); }
  .result-body { padding:14px 18px; }
  .result-summary { font-size:.88rem; color:var(--text-muted); line-height:1.6; }
  .issue-list { display:flex; flex-direction:column; gap:8px; }
  .issue-item { display:flex; gap:10px; font-size:.84rem; color:var(--text-muted); line-height:1.5; }
  .issue-dot { width:6px; height:6px; border-radius:50%; background:var(--red); margin-top:6px; flex-shrink:0; }
  .fix-dot { background:var(--green) !important; }
  .no-issues { display:flex; align-items:center; gap:8px; font-size:.88rem; color:#50e3a4; }
  .code-result { background:var(--code-bg); }
  .code-result-header { padding:10px 18px; border-bottom:1px solid var(--border); display:flex; align-items:center; justify-content:space-between; background:var(--surface); }
  .code-result-label { font-family:'JetBrains Mono',monospace; font-size:.7rem; color:var(--text-muted); }
  .code-result-inner { padding:16px 18px; overflow-x:auto; max-height:420px; overflow-y:auto; }
  .code-result-inner pre { font-family:'JetBrains Mono',monospace; font-size:.73rem; line-height:1.75; color:#8888c0; white-space:pre; }

  .loading-wrap { display:flex; flex-direction:column; align-items:center; gap:16px; padding:48px 20px; }
  .spinner { width:36px; height:36px; border:3px solid var(--border); border-top-color:var(--accent); border-radius:50%; animation:spin .8s linear infinite; }
  .spinner-sm { width:16px; height:16px; border-width:2px; }
  @keyframes spin { to{transform:rotate(360deg)} }
  .loading-steps { display:flex; flex-direction:column; gap:6px; margin-top:4px; }
  .loading-step { font-size:.78rem; color:var(--text-muted); display:flex; align-items:center; gap:8px; transition:color .3s; }
  .loading-step.done { color:var(--green); }
  .loading-step.active { color:var(--accent); }

  .footer { border-top:1px solid var(--border); padding:28px 2rem; text-align:center; font-size:.8rem; color:var(--text-muted); }
  .footer b { color:var(--accent); font-weight:600; }

  @media(max-width:640px) {
    .nav { padding:0 1rem; }
    .nav-tabs .nav-tab { padding:6px 10px; font-size:.75rem; }
    .hero { padding:60px 1rem 44px; }
    .grid { grid-template-columns:1fr; }
    .stats-bar { gap:16px; }
    .grid-section,.cats-wrap,.fixer-wrap { padding-left:1rem; padding-right:1rem; }
  }
`;

/* ═══════════════════════════════════════════════════════════════════
   SYNTAX HIGHLIGHT
═══════════════════════════════════════════════════════════════════ */
function hl(raw) {
  const e = raw.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const KW = new Set(["local","function","end","if","then","else","elseif","for","do","while","repeat","until","return","and","or","not","true","false","nil","in","break","continue"]);
  const BI = new Set(["game","workspace","script","print","task","math","string","table","pairs","ipairs","next","type","tostring","tonumber","error","warn","assert","require","pcall","xpcall","select","Instance","Vector3","CFrame","Color3","UDim2","UDim","TweenService","TweenInfo","Enum","tick","Players","ReplicatedStorage","ServerStorage","PathfindingService","UserInputService","MarketplaceService","DataStoreService","Lighting","Debris"]);
  const o=[]; let i=0;
  while(i<e.length){
    if(e[i]==="-"&&e[i+1]==="-"){let j=e.indexOf("\n",i);if(j<0)j=e.length;o.push(`<span class="code-cm">${e.slice(i,j)}</span>`);i=j;continue;}
    if(e[i]==='"'||e[i]==="'"){const q=e[i];let j=i+1;while(j<e.length&&e[j]!==q){if(e[j]==="\\")j++;j++;}j++;o.push(`<span class="code-str">${e.slice(i,j)}</span>`);i=j;continue;}
    const wm=e.slice(i).match(/^[A-Za-z_]\w*/);
    if(wm){const w=wm[0];if(KW.has(w))o.push(`<span class="code-kw">${w}</span>`);else if(BI.has(w))o.push(`<span class="code-bi">${w}</span>`);else o.push(w);i+=w.length;continue;}
    const nm=e.slice(i).match(/^\d+\.?\d*/);
    if(nm){o.push(`<span class="code-nm">${nm[0]}</span>`);i+=nm[0].length;continue;}
    o.push(e[i]);i++;
  }
  return o.join("");
}

/* ═══════════════════════════════════════════════════════════════════
   SNIPPETS (20 total)
═══════════════════════════════════════════════════════════════════ */
const S=[
  {id:1,title:"Leaderstats Setup",desc:"Create a leaderboard with Cash and Level values that appear above every player's head.",cat:"Leaderstats",diff:"Beginner",placement:"ServerScriptService",code:
`-- Leaderstats Setup
-- Place in ServerScriptService

game.Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local cash = Instance.new("IntValue")
    cash.Name = "Cash"
    cash.Value = 0
    cash.Parent = leaderstats

    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = leaderstats
end)`},

  {id:2,title:"DataStore: Save & Load",desc:"Persist player data across sessions with error handling and an auto-save loop.",cat:"Datastores",diff:"Intermediate",placement:"ServerScriptService",code:
`-- DataStore: Save & Load Player Data
-- Place in ServerScriptService

local DataStoreService = game:GetService("DataStoreService")
local db = DataStoreService:GetDataStore("PlayerData_v1")

game.Players.PlayerAdded:Connect(function(player)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local cash = Instance.new("IntValue")
    cash.Name = "Cash"
    cash.Parent = leaderstats

    local ok, data = pcall(function()
        return db:GetAsync(player.UserId)
    end)
    if ok and data then cash.Value = data.Cash or 0 end
end)

game.Players.PlayerRemoving:Connect(function(player)
    local cash = player.leaderstats.Cash.Value
    pcall(function() db:SetAsync(player.UserId, { Cash = cash }) end)
end)

-- Auto-save every 60 seconds
task.spawn(function()
    while task.wait(60) do
        for _, p in ipairs(game.Players:GetPlayers()) do
            local cash = p.leaderstats and p.leaderstats.Cash
            if cash then
                pcall(function() db:SetAsync(p.UserId, { Cash = cash.Value }) end)
            end
        end
    end
end)`},

  {id:3,title:"Gamepass Check",desc:"Check if a player owns a gamepass on join and grant a perk or reward.",cat:"Gamepasses",diff:"Intermediate",placement:"ServerScriptService",code:
`-- Gamepass Ownership Check
-- Place in ServerScriptService

local MarketplaceService = game:GetService("MarketplaceService")
local GAMEPASS_ID = 000000 -- Replace with your Gamepass ID

game.Players.PlayerAdded:Connect(function(player)
    local ok, hasPass = pcall(function()
        return MarketplaceService:UserOwnsGamePassAsync(
            player.UserId, GAMEPASS_ID
        )
    end)
    if ok and hasPass then
        player.CharacterAdded:Connect(function(char)
            local hum = char:WaitForChild("Humanoid")
            hum.WalkSpeed = 32 -- Example perk
        end)
        print(player.Name .. " owns the gamepass!")
    end
end)`},

  {id:4,title:"Kill Brick",desc:"A part that kills any player who touches it. Perfect for lava, voids, and traps.",cat:"Parts & Doors",diff:"Beginner",placement:"Script inside Part",code:
`-- Kill Brick
-- Place a Script inside the Part

local part = script.Parent

part.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
    if humanoid and humanoid.Health > 0 then
        humanoid.Health = 0
    end
end)`},

  {id:5,title:"Proximity Prompt Door",desc:"Door that opens and closes on interact, with a smooth TweenService animation.",cat:"Parts & Doors",diff:"Intermediate",placement:"Script inside Door Model",code:
`-- Proximity Prompt Door
-- Place Script inside a Model with a PrimaryPart and ProximityPrompt

local TweenService = game:GetService("TweenService")
local door   = script.Parent
local prompt = door:FindFirstChildOfClass("ProximityPrompt", true)

local isOpen    = false
local debounce  = false
local closedCF  = door.PrimaryPart.CFrame

prompt.Triggered:Connect(function()
    if debounce then return end
    debounce = true
    isOpen = not isOpen

    local targetCF = isOpen
        and closedCF * CFrame.Angles(0, math.rad(90), 0)
        or closedCF

    TweenService:Create(
        door.PrimaryPart,
        TweenInfo.new(0.4, Enum.EasingStyle.Quad),
        { CFrame = targetCF }
    ):Play()

    prompt.ActionText = isOpen and "Close" or "Open"
    task.wait(0.5)
    debounce = false
end)`},

  {id:6,title:"Give Tool on Touch",desc:"Give a player a tool from ServerStorage when they step on a part. Includes debounce.",cat:"Tools",diff:"Beginner",placement:"Script inside Part",code:
`-- Give Tool on Touch
-- Place Script inside the Part; put your Tool in ServerStorage

local ServerStorage = game:GetService("ServerStorage")
local TOOL_NAME = "Sword" -- Change to your tool's name
local debounces = {}

script.Parent.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player or debounces[player.UserId] then return end
    debounces[player.UserId] = true

    local tool = ServerStorage:FindFirstChild(TOOL_NAME)
    if tool
       and not player.Backpack:FindFirstChild(TOOL_NAME)
       and not hit.Parent:FindFirstChild(TOOL_NAME) then
        tool:Clone().Parent = player.Backpack
    end

    task.wait(1)
    debounces[player.UserId] = nil
end)`},

  {id:7,title:"Basic Round System",desc:"Loop-based round system with intermission, random map selection, and countdown timer.",cat:"Systems",diff:"Intermediate",placement:"ServerScriptService",code:
`-- Basic Round System
-- Place in ServerScriptService

local ROUND_TIME   = 120
local INTERMISSION = 15
local MIN_PLAYERS  = 2
local mapsFolder   = workspace:WaitForChild("Maps")
local activeMap    = nil

local function loadMap()
    if activeMap then activeMap:Destroy() end
    local maps = mapsFolder:GetChildren()
    if #maps == 0 then return end
    activeMap = maps[math.random(1, #maps)]:Clone()
    activeMap.Parent = workspace
    print("Loaded map: " .. activeMap.Name)
end

local function countdown(seconds, label)
    for i = seconds, 1, -1 do
        print(label .. i)   -- update your status GUI here
        task.wait(1)
    end
end

while true do
    print("Waiting for players...")
    repeat task.wait(2) until #game.Players:GetPlayers() >= MIN_PLAYERS
    countdown(INTERMISSION, "Intermission: ")
    loadMap()
    print("Round started!")
    countdown(ROUND_TIME, "Time left: ")
    print("Round over!")
    if activeMap then activeMap:Destroy(); activeMap = nil end
    task.wait(2)
end`},

  {id:8,title:"Checkpoint System",desc:"Save a player's respawn location when they touch a checkpoint. Visual flash on save.",cat:"Systems",diff:"Beginner",placement:"Script inside Checkpoint Part",code:
`-- Checkpoint System
-- Place this Script inside every checkpoint Part

local checkpoint = script.Parent
local debounces  = {}

checkpoint.Touched:Connect(function(hit)
    local player = game.Players:GetPlayerFromCharacter(hit.Parent)
    if not player or debounces[player.UserId] then return end
    debounces[player.UserId] = true

    if player.RespawnLocation ~= checkpoint then
        player.RespawnLocation = checkpoint
        print(player.Name .. " saved at: " .. checkpoint.Name)
        local orig = checkpoint.Color
        checkpoint.Color = Color3.fromRGB(80, 227, 164)
        task.wait(0.4)
        checkpoint.Color = orig
    end

    task.wait(1)
    debounces[player.UserId] = nil
end)`},

  {id:9,title:"RemoteEvent: Client → Server",desc:"Safe template for client-to-server communication with server-side validation.",cat:"Networking",diff:"Intermediate",placement:"ServerScriptService + LocalScript",code:
`-- RemoteEvent: Client to Server
-- SERVER: Place in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local myEvent = Instance.new("RemoteEvent")
myEvent.Name   = "MyEvent"
myEvent.Parent = ReplicatedStorage

myEvent.OnServerEvent:Connect(function(player, action, value)
    -- Always validate on server — never trust the client!
    if typeof(action) ~= "string" then return end
    if typeof(value)  ~= "number"  then return end

    if action == "BuyItem" then
        local cash = player.leaderstats and player.leaderstats.Cash
        if cash and cash.Value >= value then
            cash.Value -= value
            print(player.Name .. " spent " .. value .. " cash")
        end
    end
end)

-- ──────────────────────────────────────────────
-- CLIENT: LocalScript (StarterPlayerScripts)
-- local ReplicatedStorage = game:GetService("ReplicatedStorage")
-- local myEvent = ReplicatedStorage:WaitForChild("MyEvent")
-- myEvent:FireServer("BuyItem", 50)`},

  {id:10,title:"Admin Commands",desc:"Chat-based admin: /kick, /speed, /heal, /respawn. Supports partial name matching.",cat:"Admin",diff:"Intermediate",placement:"ServerScriptService",code:
`-- Admin Commands
-- Place in ServerScriptService

local ADMINS = {
    [000000000] = true, -- Replace with your UserId
}

local function findPlayer(name)
    for _, p in ipairs(game.Players:GetPlayers()) do
        if p.Name:lower():sub(1, #name) == name:lower() then return p end
    end
end

game.Players.PlayerAdded:Connect(function(player)
    if not ADMINS[player.UserId] then return end

    player.Chatted:Connect(function(msg)
        local args   = msg:split(" ")
        local cmd    = args[1]:lower()
        local target = args[2] and findPlayer(args[2])

        if cmd == "/kick" and target then
            target:Kick(args[3] or "Kicked by admin.")
        elseif cmd == "/speed" and target and args[3] then
            local hum = target.Character
                and target.Character:FindFirstChildOfClass("Humanoid")
            if hum then hum.WalkSpeed = tonumber(args[3]) or 16 end
        elseif cmd == "/heal" and target then
            local hum = target.Character
                and target.Character:FindFirstChildOfClass("Humanoid")
            if hum then hum.Health = hum.MaxHealth end
        elseif cmd == "/respawn" and target then
            target:LoadCharacter()
        end
    end)
end)`},

  {id:11,title:"Shop System",desc:"Buy items with in-game cash via RemoteEvent. Server validates every purchase — exploit-safe.",cat:"Economy",diff:"Intermediate",placement:"ServerScriptService + LocalScript",code:
`-- Shop System
-- SERVER: Place in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage     = game:GetService("ServerStorage")

local ITEMS = {
    Sword  = { price = 50,  toolName = "Sword"  },
    Shield = { price = 100, toolName = "Shield" },
    Bow    = { price = 75,  toolName = "Bow"    },
}

local buyEvent = Instance.new("RemoteEvent")
buyEvent.Name   = "BuyItem"
buyEvent.Parent = ReplicatedStorage

buyEvent.OnServerEvent:Connect(function(player, itemId)
    local item = ITEMS[itemId]
    if not item then return end

    local cash = player.leaderstats and player.leaderstats:FindFirstChild("Cash")
    if not cash or cash.Value < item.price then return end

    local tool = ServerStorage:FindFirstChild(item.toolName)
    if not tool then return end

    cash.Value -= item.price
    tool:Clone().Parent = player.Backpack
    print(player.Name .. " bought " .. itemId)
end)

-- ──────────────────────────────────────────────
-- CLIENT: LocalScript
-- local buyEvent = ReplicatedStorage:WaitForChild("BuyItem")
-- buyEvent:FireServer("Sword")  -- call when player clicks Buy`},

  {id:12,title:"NPC Typewriter Dialogue",desc:"Display NPC dialogue with a classic typewriter effect. Easy to customize lines and speed.",cat:"NPC",diff:"Intermediate",placement:"LocalScript in StarterPlayerScripts",code:
`-- NPC Typewriter Dialogue
-- Place LocalScript in StarterPlayerScripts
-- Requires: PlayerGui > DialogueGui > Frame > TextLabel

local Players = game:GetService("Players")
local player  = Players.LocalPlayer
local gui     = player.PlayerGui:WaitForChild("DialogueGui")
local frame   = gui:WaitForChild("Frame")
local label   = frame:WaitForChild("TextLabel")

local DIALOGUE = {
    "Hello, traveler.",
    "Are you looking for the lost sword?",
    "It was last seen in the Dark Forest...",
    "Be careful out there.",
}
local CHAR_SPEED = 0.04  -- seconds per character
local LINE_PAUSE = 2.5   -- seconds between lines
local running    = false

local function typewrite(text)
    label.Text = ""
    for i = 1, #text do
        label.Text = text:sub(1, i)
        task.wait(CHAR_SPEED)
    end
end

local function runDialogue()
    if running then return end
    running = true
    frame.Visible = true
    for _, line in ipairs(DIALOGUE) do
        typewrite(line)
        task.wait(LINE_PAUSE)
    end
    frame.Visible = false
    running = false
end

-- Wire up to a ProximityPrompt:
-- local prompt = workspace.NPC:FindFirstChildOfClass("ProximityPrompt", true)
-- if prompt then prompt.Triggered:Connect(runDialogue) end`},

  {id:13,title:"NPC Wander (Pathfinding)",desc:"NPC that randomly wanders around its spawn using PathfindingService with jump support.",cat:"NPC",diff:"Intermediate",placement:"Script inside NPC Model",code:
`-- NPC Wander with PathfindingService
-- Place Script inside the NPC Model

local PathfindingService = game:GetService("PathfindingService")
local npc      = script.Parent
local humanoid = npc:WaitForChild("Humanoid")
local root     = npc:WaitForChild("HumanoidRootPart")

local RADIUS = 30
local DELAY  = 3

local function getTarget()
    local p = root.Position
    return Vector3.new(
        p.X + math.random(-RADIUS, RADIUS),
        p.Y,
        p.Z + math.random(-RADIUS, RADIUS)
    )
end

local function walkTo(target)
    local path = PathfindingService:CreatePath({
        AgentRadius = 2, AgentHeight = 5,
    })
    local ok = pcall(function()
        path:ComputeAsync(root.Position, target)
    end)
    if not ok or path.Status ~= Enum.PathStatus.Success then return end

    for _, wp in ipairs(path:GetWaypoints()) do
        if wp.Action == Enum.PathWaypointAction.Jump then
            humanoid.Jump = true
        end
        humanoid:MoveTo(wp.Position)
        humanoid.MoveToFinished:Wait()
    end
end

while task.wait(DELAY) do
    if humanoid.Health > 0 then
        walkTo(getTarget())
    end
end`},

  {id:14,title:"Give Cash on Kill",desc:"Award the killer cash when they eliminate another player. Tag-based system.",cat:"Economy",diff:"Beginner",placement:"ServerScriptService",code:
`-- Give Cash on Kill
-- Place in ServerScriptService

local CASH_REWARD = 10

game.Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")

        humanoid.Died:Connect(function()
            local tag = humanoid:FindFirstChild("creator")
            if not tag or not tag.Value then return end
            local killer = tag.Value
            if killer == player then return end  -- no self-kill reward

            local cash = killer.leaderstats
                and killer.leaderstats:FindFirstChild("Cash")
            if cash then
                cash.Value += CASH_REWARD
            end
        end)
    end)
end)

-- TAG USAGE: when your weapon deals damage, run this:
-- local tag = Instance.new("ObjectValue")
-- tag.Name, tag.Value = "creator", attackingPlayer
-- tag.Parent = humanoid
-- game:GetService("Debris"):AddItem(tag, 2)`},

  {id:15,title:"Day/Night Cycle",desc:"Smooth looping day/night cycle with configurable speed and starting time.",cat:"Systems",diff:"Beginner",placement:"ServerScriptService",code:
`-- Day/Night Cycle
-- Place in ServerScriptService

local Lighting   = game:GetService("Lighting")
local CYCLE_TIME = 600  -- real seconds per full day (600 = 10 min)
local START_TIME = 8    -- 8 = 8:00 AM
local TICK       = 0.1  -- update every 0.1 seconds

local clock = START_TIME

while true do
    task.wait(TICK)
    clock = clock + (24 / CYCLE_TIME) * TICK
    if clock >= 24 then clock = 0 end
    Lighting.ClockTime = clock
end`},

  {id:16,title:"TweenService: GUI Slide-in",desc:"Animate a Frame sliding on and off screen. Great for menus, panels, and inventory UIs.",cat:"GUI",diff:"Beginner",placement:"LocalScript in StarterGui",code:
`-- TweenService: GUI Slide-in / Slide-out
-- Place LocalScript inside your ScreenGui

local TweenService = game:GetService("TweenService")
local gui        = script.Parent  -- ScreenGui
local frame      = gui:WaitForChild("MenuFrame")
local openButton = gui:WaitForChild("OpenButton")

local tweenInfo = TweenInfo.new(0.4, Enum.EasingStyle.Quint, Enum.EasingDirection.Out)
local isOpen    = false

local OPEN_POS   = UDim2.new(0.5, 0, 0.5, 0)   -- center of screen
local CLOSED_POS = UDim2.new(0.5, 0, 1.5, 0)   -- below screen

frame.Position = CLOSED_POS

local function toggle()
    isOpen = not isOpen
    TweenService:Create(
        frame, tweenInfo,
        { Position = isOpen and OPEN_POS or CLOSED_POS }
    ):Play()
end

openButton.MouseButton1Click:Connect(toggle)
openButton.TouchTap:Connect(toggle)`},

  {id:17,title:"Toast Notification",desc:"Pop-up toast that slides in from the bottom and auto-dismisses. Fully reusable.",cat:"GUI",diff:"Intermediate",placement:"LocalScript in StarterGui",code:
`-- Toast Notification
-- Place LocalScript inside your ScreenGui, call showToast() anywhere

local TweenService = game:GetService("TweenService")
local gui = script.Parent  -- your ScreenGui

local function showToast(message, duration)
    duration = duration or 2.5

    local screen = Instance.new("ScreenGui")
    screen.Name            = "Toast"
    screen.ResetOnSpawn    = false
    screen.IgnoreGuiInset  = true
    screen.Parent          = gui.Parent

    local frame = Instance.new("Frame", screen)
    frame.Size                   = UDim2.new(0, 260, 0, 48)
    frame.AnchorPoint            = Vector2.new(0.5, 1)
    frame.Position               = UDim2.new(0.5, 0, 0.92, 60)
    frame.BackgroundColor3       = Color3.fromRGB(20, 20, 40)
    frame.BorderSizePixel        = 0
    Instance.new("UICorner", frame).CornerRadius = UDim.new(0, 10)

    local label = Instance.new("TextLabel", frame)
    label.Size                   = UDim2.new(1, -20, 1, 0)
    label.Position               = UDim2.new(0, 10, 0, 0)
    label.BackgroundTransparency = 1
    label.Text                   = message
    label.TextColor3             = Color3.new(1, 1, 1)
    label.TextSize               = 14
    label.Font                   = Enum.Font.GothamMedium
    label.TextXAlignment         = Enum.TextXAlignment.Left

    local info    = TweenInfo.new(0.3, Enum.EasingStyle.Quint)
    local VISIBLE = UDim2.new(0.5, 0, 0.92, 0)
    local HIDDEN  = UDim2.new(0.5, 0, 0.92, 60)

    TweenService:Create(frame, info, { Position = VISIBLE }):Play()
    task.wait(duration)
    local out = TweenService:Create(frame, info, { Position = HIDDEN })
    out:Play()
    out.Completed:Wait()
    screen:Destroy()
end

-- Usage:
showToast("✓ Item purchased!")
-- showToast("Not enough cash!", 3)`},

  {id:18,title:"Anti-Cheat: Speed Detection",desc:"Detect and kick players moving faster than a configurable studs-per-second threshold.",cat:"Security",diff:"Intermediate",placement:"ServerScriptService",code:
`-- Anti-Cheat: Speed Detection
-- Place in ServerScriptService

local MAX_SPEED      = 100  -- studs/sec — raise if you have speed gamepasses
local CHECK_INTERVAL = 1    -- how often to check
local KICK_MSG       = "Kicked: abnormal movement speed detected."

local prevPos = {}

game.Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local root     = character:WaitForChild("HumanoidRootPart")
        local humanoid = character:WaitForChild("Humanoid")
        prevPos[player.UserId] = root.Position

        task.spawn(function()
            while character.Parent and humanoid.Health > 0 do
                task.wait(CHECK_INTERVAL)
                if not root.Parent then break end

                local dist = (root.Position - prevPos[player.UserId]).Magnitude
                if dist / CHECK_INTERVAL > MAX_SPEED then
                    player:Kick(KICK_MSG)
                    return
                end
                prevPos[player.UserId] = root.Position
            end
            prevPos[player.UserId] = nil
        end)
    end)
end)`},

  {id:19,title:"RemoteFunction: Get Server Data",desc:"Client requests data from server synchronously. Safe pattern with server-side validation.",cat:"Networking",diff:"Intermediate",placement:"ServerScriptService + LocalScript",code:
`-- RemoteFunction: Client Requests Data from Server
-- SERVER: Place in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local rf = Instance.new("RemoteFunction")
rf.Name   = "GetPlayerStats"
rf.Parent = ReplicatedStorage

rf.OnServerInvoke = function(player)
    local ls = player.leaderstats
    if not ls then return {} end
    return {
        cash  = ls.Cash  and ls.Cash.Value  or 0,
        level = ls.Level and ls.Level.Value or 1,
    }
end

-- ──────────────────────────────────────────────
-- CLIENT: LocalScript
-- local ReplicatedStorage = game:GetService("ReplicatedStorage")
-- local rf = ReplicatedStorage:WaitForChild("GetPlayerStats")
--
-- local stats = rf:InvokeServer()
-- print("Cash:", stats.cash, "Level:", stats.level)`},

  {id:20,title:"Mobile Action Button",desc:"On-screen button that only renders on touch devices. Perfect for jump, attack, or abilities.",cat:"GUI",diff:"Beginner",placement:"LocalScript in StarterGui",code:
`-- Mobile Action Button
-- Place LocalScript inside your ScreenGui

local UserInputService = game:GetService("UserInputService")
local Players          = game:GetService("Players")

-- Only show on touch devices
if not UserInputService.TouchEnabled then return end

local player    = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid  = character:WaitForChild("Humanoid")
local gui       = script.Parent  -- ScreenGui

local button = Instance.new("TextButton", gui)
button.Size                   = UDim2.new(0, 72, 0, 72)
button.Position               = UDim2.new(1, -90, 1, -100)
button.AnchorPoint            = Vector2.new(0, 1)
button.Text                   = "⚡"
button.TextSize               = 28
button.BackgroundColor3       = Color3.fromRGB(40, 40, 80)
button.TextColor3             = Color3.new(1, 1, 1)
button.BackgroundTransparency = 0.2
button.BorderSizePixel        = 0
Instance.new("UICorner", button).CornerRadius = UDim.new(1, 0)

-- Replace with your desired action:
button.MouseButton1Click:Connect(function()
    humanoid.Jump = true
end)`},
];

/* ═══════════════════════════════════════════════════════════════════
   CATEGORY COLORS
═══════════════════════════════════════════════════════════════════ */
const CC={
  Leaderstats:    {bg:"rgba(80,227,164,.09)",  c:"#50e3a4", b:"rgba(80,227,164,.22)"},
  Datastores:     {bg:"rgba(74,158,255,.09)",  c:"#4a9eff", b:"rgba(74,158,255,.22)"},
  Gamepasses:     {bg:"rgba(232,160,32,.09)",  c:"#e8a020", b:"rgba(232,160,32,.22)"},
  "Parts & Doors":{bg:"rgba(255,112,67,.09)",  c:"#ff7043", b:"rgba(255,112,67,.22)"},
  Tools:          {bg:"rgba(186,104,200,.09)", c:"#ba68c8", b:"rgba(186,104,200,.22)"},
  Economy:        {bg:"rgba(255,215,0,.09)",   c:"#ffd700", b:"rgba(255,215,0,.22)"},
  NPC:            {bg:"rgba(77,208,225,.09)",  c:"#4dd0e1", b:"rgba(77,208,225,.22)"},
  GUI:            {bg:"rgba(178,102,255,.09)", c:"#b266ff", b:"rgba(178,102,255,.22)"},
  Systems:        {bg:"rgba(100,200,120,.09)", c:"#64c878", b:"rgba(100,200,120,.22)"},
  Networking:     {bg:"rgba(240,98,146,.09)",  c:"#f06292", b:"rgba(240,98,146,.22)"},
  Admin:          {bg:"rgba(239,83,80,.09)",   c:"#ef5350", b:"rgba(239,83,80,.22)"},
  Security:       {bg:"rgba(255,160,0,.09)",   c:"#ffa000", b:"rgba(255,160,0,.22)"},
};
const CATS=["All","Leaderstats","Datastores","Gamepasses","Parts & Doors","Tools","Economy","NPC","GUI","Systems","Networking","Admin","Security"];

/* ═══════════════════════════════════════════════════════════════════
   CARD
═══════════════════════════════════════════════════════════════════ */
function Card({s}){
  const [open,setOpen]=useState(false);
  const [copied,setCopied]=useState(false);
  const cs=CC[s.cat]||{};
  function copy(){navigator.clipboard.writeText(s.code).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000);}
  return(
    <div className="card">
      <div className="card-header">
        <div className="card-top">
          <div className="card-badges">
            <span className="cat-badge" style={{background:cs.bg,color:cs.c,borderColor:cs.b}}>{s.cat}</span>
            <span className={`diff-badge diff-${s.diff.toLowerCase()}`}>{s.diff}</span>
          </div>
          <span className="placement">{s.placement}</span>
        </div>
        <div className="card-title">{s.title}</div>
        <div className="card-desc">{s.desc}</div>
      </div>
      <div className="card-actions">
        <button className={`btn ${copied?"btn-green":"btn-accent"}`} onClick={copy}>{copied?"✓ Copied!":"⎘ Copy"}</button>
        <button className="btn btn-ghost" onClick={()=>setOpen(v=>!v)}>{open?"▲ Hide":"▼ View Code"}</button>
      </div>
      <div className={`code-wrap ${open?"open":""}`}>
        <div className="code-inner"><pre dangerouslySetInnerHTML={{__html:hl(s.code)}}/></div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   AI FIXER
═══════════════════════════════════════════════════════════════════ */
const SYS=`You are a world-class Roblox Luau developer with deep knowledge of Roblox Studio, the Roblox API, and production game development best practices.

Analyze the provided script thoroughly for ALL of the following:

BUGS & ERRORS:
- Incorrect API casing (e.g. findFirstChild vs FindFirstChild)
- Missing nil checks that will cause runtime errors
- Accessing properties on potentially nil values
- Wrong service names or deprecated APIs

SECURITY & EXPLOITS:
- Any logic that can be exploited by clients
- Missing server-side validation
- Cash/currency manipulation vulnerabilities
- Missing player existence checks after async operations

ROBLOX BEST PRACTICES:
- Instance.new('Tool') is WRONG — tools must be cloned from ServerStorage, never created blank
- Never use workspace.X directly — use WaitForChild or FindFirstChild
- Always use pcall around DataStore operations
- RemoteEvents must validate ALL input on the server
- Touched events need debounce to prevent rapid firing
- Use task.wait() not wait(), use task.spawn() not spawn()
- Always check player.Character exists before accessing it
- Tags (creator) should use Debris:AddItem for cleanup

FUNCTIONALITY:
- Code that won't actually work in a real game even if it doesn't error
- Missing pieces that would prevent the script from functioning correctly
- Logic errors that produce wrong behavior

Respond ONLY with a valid JSON object — no markdown, no backticks:
{"summary":"One sentence: what this script does","issues":["specific issue 1","specific issue 2"],"fixedCode":"complete corrected script","whatChanged":["change 1 + brief reason"]}

If no issues exist, return empty arrays for issues and whatChanged, and return the original code in fixedCode.
Be specific in issues — say exactly what line or pattern is wrong and why.`;

const STEPS=["Reading your script…","Identifying issues…","Generating fix…","Finalizing…"];

function AIFixer(){
  const [code,setCode]=useState("");
  const [loading,setLoading]=useState(false);
  const [step,setStep]=useState(0);
  const [result,setResult]=useState(null);
  const [err,setErr]=useState(null);
  const [copiedFix,setCopiedFix]=useState(false);

  async function fix(){
    if(!code.trim())return;
    setLoading(true);setResult(null);setErr(null);setStep(0);
    const iv=setInterval(()=>setStep(s=>Math.min(s+1,STEPS.length-1)),900);
    try{
      const res=await fetch("/api/fix",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:4096,
          system:SYS,
          messages:[{role:"user",content:`Script:\n\n${code}`}],
        }),
      });

      if(!res.ok){
        const errBody=await res.text().catch(()=>"");
        throw new Error(`API error ${res.status}: ${errBody.slice(0,200)}`);
      }

      const data=await res.json();

      // Handle API-level errors (e.g. auth, overload)
      if(data.error){
        throw new Error(`API: ${data.error.message||JSON.stringify(data.error)}`);
      }

      const txt=data.content?.map(b=>b.text||"").join("")||"";
      if(!txt) throw new Error("Empty response from API");

      // Robust JSON extraction — strip markdown fences, find first { ... }
      const clean=txt.replace(/```json|```/g,"").trim();
      const jsonMatch=clean.match(/\{[\s\S]*\}/);
      if(!jsonMatch) throw new Error(`Could not find JSON in response: ${clean.slice(0,200)}`);

      const parsed=JSON.parse(jsonMatch[0]);
      setResult(parsed);

    }catch(e){
      setErr(`Error: ${e.message}`);
    }finally{
      clearInterval(iv);setStep(STEPS.length-1);setLoading(false);
    }
  }

  function copyFix(){
    if(result?.fixedCode){navigator.clipboard.writeText(result.fixedCode).catch(()=>{});setCopiedFix(true);setTimeout(()=>setCopiedFix(false),2000);}
  }

  return(
    <div className="fixer-wrap">
      <div className="fixer-hero">
        <h2>Fix My <em>Script</em></h2>
        <p>Paste any broken Roblox Studio script. Claude will find the bugs, explain what went wrong, and hand back a corrected version.</p>
      </div>

      <div className="fixer-box">
        <div className="fixer-label">Your Script</div>
        <textarea className="fixer-textarea" value={code} onChange={e=>setCode(e.target.value)} spellCheck={false}
          placeholder={`-- Paste your script here, for example:\nlocal part = script.parent  -- bug: lowercase 'parent'\npart.Touched:Connect(function(hit)\n    hit.Parent.Humanoid.Health = 0\nend)`}/>
        <div className="fixer-actions">
          <span className="fixer-hint">{code.trim()?`${code.split("\n").length} lines · Free · Powered by Claude`:"Free · Powered by Claude"}</span>
          <button className="btn-fix" onClick={fix} disabled={loading||!code.trim()}>
            {loading?<><div className="spinner spinner-sm"/>Analyzing…</>:"🔧 Fix My Script"}
          </button>
        </div>
      </div>

      {loading&&(
        <div className="result-card" style={{marginTop:24}}>
          <div className="loading-wrap">
            <div className="spinner"/>
            <div className="loading-steps">
              {STEPS.map((s,i)=>(
                <div key={i} className={`loading-step ${i<step?"done":i===step?"active":""}`}>
                  <span>{i<step?"✓":i===step?"→":"·"}</span>{s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {err&&<div className="result-card" style={{marginTop:24}}><div className="result-body"><div style={{color:"#ef5350",fontSize:".88rem"}}>{err}</div></div></div>}

      {result&&!loading&&(
        <div className="results">
          <div className="result-card">
            <div className="result-header"><span className="result-icon">📋</span><span className="result-title">What This Script Does</span></div>
            <div className="result-body"><div className="result-summary">{result.summary}</div></div>
          </div>

          <div className="result-card">
            <div className="result-header">
              <span className="result-icon">{result.issues?.length>0?"⚠️":"✅"}</span>
              <span className="result-title">{result.issues?.length>0?`${result.issues.length} Issue${result.issues.length!==1?"s":""} Found`:"No Issues Found"}</span>
            </div>
            <div className="result-body">
              {result.issues?.length>0
                ?<div className="issue-list">{result.issues.map((iss,i)=><div key={i} className="issue-item"><div className="issue-dot"/>{iss}</div>)}</div>
                :<div className="no-issues">✓ Your script looks clean!</div>}
            </div>
          </div>

          {result.whatChanged?.length>0&&(
            <div className="result-card">
              <div className="result-header"><span className="result-icon">🛠️</span><span className="result-title">What Was Fixed</span></div>
              <div className="result-body">
                <div className="issue-list">{result.whatChanged.map((c,i)=><div key={i} className="issue-item"><div className="issue-dot fix-dot"/>{c}</div>)}</div>
              </div>
            </div>
          )}

          <div className="result-card code-result">
            <div className="code-result-header">
              <span className="code-result-label">fixed_script.lua</span>
              <button className={`btn ${copiedFix?"btn-green":"btn-accent"}`} onClick={copyFix}>{copiedFix?"✓ Copied!":"⎘ Copy Fixed Script"}</button>
            </div>
            <div className="code-result-inner"><pre dangerouslySetInnerHTML={{__html:hl(result.fixedCode||"")}}/></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════════ */
export default function App(){
  const [tab,setTab]=useState("library");
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("All");

  const filtered=S.filter(s=>{
    const mc=cat==="All"||s.cat===cat;
    const q=search.toLowerCase();
    const mq=!q||s.title.toLowerCase().includes(q)||s.desc.toLowerCase().includes(q)||s.cat.toLowerCase().includes(q)||s.diff.toLowerCase().includes(q);
    return mc&&mq;
  });

  return(
    <>
      <style>{STYLES}</style>
      <nav className="nav">
        <div className="nav-left">
          <div className="nav-logo" onClick={()=>setTab("library")}>
            <div className="logo-box">🔒</div>StudioVault
          </div>
          <span className="nav-pill">Beta</span>
        </div>
        <div className="nav-tabs">
          <button className={`nav-tab ${tab==="library"?"active":""}`} onClick={()=>setTab("library")}>
            <span>📦 Script Library</span>
          </button>
          <button className={`nav-tab ${tab==="fixer"?"active":""}`} onClick={()=>setTab("fixer")}>
            <span>🔧 Fix My Script</span><span className="tab-badge">AI</span>
          </button>
        </div>
      </nav>

      {tab==="library"?(
        <>
          <div className="hero">
            <div className="hero-grid"/><div className="hero-glow"/>
            <div className="hero-eyebrow"><div className="hero-dot"/>Free for all Roblox developers</div>
            <h1 className="hero-title">The Script <em>Vault</em><br/>for Roblox Devs</h1>
            <p className="hero-sub">Copy‑paste ready Luau scripts for the most common Roblox Studio tasks. No fluff, no broken tutorials.</p>
            <div className="search-wrap">
              <span className="search-ico">🔍</span>
              <input className="search-input" placeholder="Search… datastore, NPC, shop, kill brick…" value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
          </div>

          <div className="stats-bar">
            <div className="stat"><div className="stat-num">{S.length}</div><div className="stat-lbl">Scripts</div></div>
            <div className="stat-div"/>
            <div className="stat"><div className="stat-num">{CATS.length-1}</div><div className="stat-lbl">Categories</div></div>
            <div className="stat-div"/>
            <div className="stat"><div className="stat-num">Free</div><div className="stat-lbl">Always</div></div>
          </div>

          <div className="cats-wrap">
            <div className="cats-label">Filter by category</div>
            <div className="cats">
              {CATS.map(c=><button key={c} className={`cat-pill ${cat===c?"active":""}`} onClick={()=>setCat(c)}>{c}</button>)}
            </div>
          </div>

          <div className="grid-section">
            <div className="grid-meta">
              <div className="grid-count">{filtered.length} script{filtered.length!==1?"s":""}{cat!=="All"?` in ${cat}`:""}{search?` matching "${search}"`:""}  </div>
            </div>
            <div className="grid">
              {filtered.length>0
                ?filtered.map(s=><Card key={s.id} s={s}/>)
                :<div className="empty"><div className="empty-ico">🔍</div><div>No scripts found. Try a different search.</div></div>}
            </div>
          </div>
        </>
      ):(
        <AIFixer/>
      )}

      <footer className="footer">
        <b>StudioVault</b> · Free Luau scripts for Roblox developers · AI fixer powered by Claude
      </footer>
    </>
  );
}
