$SpriteCollabPath = Read-Host -Prompt 'Enter SpriteCollab repo local folder path'
ts-node split.ts $SpriteCollabPath
foreach ($item in Get-ChildItem ./split) {
    TexturePacker.exe --verbose --pack-mode Good --sheet sheets/${item}.png --data sheets/${item}.json --texture-format png8 --format phaser  --trim-sprite-names ./split/${item}
}
ts-node minify.ts
ts-node move.ts $SpriteCollabPath