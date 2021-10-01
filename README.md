# 機能
本ソフトウェアは配信ソフトOBSにゲームコントローラーの入力を表示するために開発しました。  

ゲームコントローラーでどのボタンを押しているかをグラフィック表示したり、キーログ（キーディスプレイ）表示ができるようになります。  

入力情報の取得はGamepad API（Web API）を使用しているため、**XInput未対応のゲームコントローラーやキーボードなどには対応しておりません**。  

# 使い方
配信ソフトOBSのソースに、本ソフトウェア（index.html）を「ブラウザ」として設定することで使用できるようになります。  

その際はブラウザソースのプロパティの「URL」に「`http://absolute/C:/GameInputDisplay/index.html`」のように設定してください（ローカルファイルパスの頭に「`http://absolute/`」をつける）。  
**「ローカルファイル」として設定するとパラメーター設定ができなくなるので注意**してください。  

ダウンロードせずに「`https://codelelou.github.io/GameInputDisplay/index.html`」と設定することでも動作はしますが、オフライン環境やサーバーが落ちている時などは使用できませんし、処理に遅延が発生する場合があります。  

## サイズ・表示位置の調整
ゲームコントローラーかキーログの一方のみを表示する場合は、配信ソフトのソース管理機能でサイズを変更しお好みの位置に移動させる方法が簡単です。  

両方を表示する場合は、カスタムCSSでサイズ・表示位置の調整ができます。  

ゲームコントローラーとキーログをそれぞれ別のブラウザソースとして設定することもできますが、本ソフトウェアが2つ同時に起動することになりパフォーマンスは落ちます。  
参照コピーで工夫することでサイズ・表示位置を調整することは可能です（参照コピーであれば複数起動は防げます）。  

### カスタムCSSでサイズ・表示位置を調整
まずは本ソフトウェアのプロパティの「幅」と「高さ」を配信画面と同じにし、画面全体に表示されるようにします。  
例えば配信画面が1920×1080であれば、幅を「1920」に、高さを「1080」にします。  

そして「カスタムCSS」に次のCSSを追記します。  
~~~
#GIDKeyLog {  /* キーログ */
  zoom: 200%;  /* 拡大縮小（他の設定にも影響します） */
  top: 0px;  /* 縦方向の移動（マイナス値も設定可能） */
  left: 300px;  /* 横方向の移動（マイナス値も設定可能） */
  opacity: 0.3;  /* 透明度（「0」にすると見えなくなる */
}

#GIDGameController {  /* ゲームコントローラー */
  top: 910px;  /* 縦方向の移動（マイナス値も設定可能） */
  left: 50px;  /* 横方向の移動（マイナス値も設定可能） */
  width: 400px;  /* 横幅 */
}
~~~
ご自身の配信レイアウトに応じて、お好みで数値は調整してください。  
**キーログはゲームコントローラーの入力がないと表示されない**ので注意してください（ゲームの起動は不要です）。

キーログの表示数はパラメーター設定の「log」で変更できます。  

# パラメーター設定
本ソフトウェアの各種設定は、「`index.html?delay=4&log=20&excludes=8,9,11&style=DualPad`」のようにパラメーターから指定できます。  
**スペースや全角などが含まれているような場合は、正常に本ソフトウェアが動作しない場合があります**。  

## modes
既定値：Controller,KeyLog  

コントローラーかキーログのどちらか一方のみを表示したい場合は「`index.html?modes=Controller`」のように指定します。  

デバッグモード（「`index.html?modes=Debug`」）が有効の場合は、コントローラーもキーログも両方表示されます。  
デバッグモードでは各パラメーターの設定情報の確認と、パソコンに繋いでいるコントローラーの情報（接続Indexやボタン番号など）を確認できます。  

### modes値
- Controller
- KeyLog
- Debug

## controller
既定値：0  

複数のコントローラーを繋いでいる場合は、入力を表示したいコントローラーのIndexを指定してください。  
デバッグモードで接続中のゲームコントローラーのIndexを確認することができます。  

## delay
既定値：8

本ソフトウェアは一定間隔でゲームコントローラーの情報を取得しており、その間隔をミリ秒で指定することができます。  

**間隔が短すぎるとパソコンに過度の負荷が掛かったり、ブラウザの制約などにより指定した間隔で動作しない**場合があります。  
4ミリ秒未満を指定した場合は、ブラウザの内部処理で4ミリ秒間隔として処理が行われるようです。  

## log
既定値：100

キーログの表示件数を指定します。  
最大「100件」に対応しています。

## excludes
既定値はありません。  

入力を無視したいボタンの番号を「`index.html?excludes=8,9,11`」のように、半角カンマ区切りで指定します。  
これは本ソフトウェア用の設定のため、**プレイ中のゲームなどには影響しません**。  

## styles
既定値：Front6Pad  

コントローラースキンやキーログ用キーコンフィグプリセットの指定ができます。  

キーコンフィグプリセットを指定する際は、「`index.html?styles=Front6Pad,B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VShift_B7HK`」のように半角カンマ区切りでコントローラースキンも指定してください。  
**コントローラースキンが未設定状態の場合はコントローラーが表示されない**場合があります。  

### コントローラースキン
- Front6Pad（既定・6ボタンゲームパッド風）
- ArcadeController（アーケードコントローラー風）
- ButtonBox（HitBox・レバーレスコントローラー風）
- DualBox（HitBoxCrossUp風）
- DualPad（DualShock・DualSense風）

標準でこれらのコントローラースキンを指定できます。  

# キーログ（キーディスプレイ）
キーコンフィグはCSSでカスタマイズ可能です。  

初期設定のキーコンフィグは次の通りです（対戦格闘アクションゲーム「ストリートファイターV」での使用を想定したキーコンフィグになっています）。  

ボタン0 = 弱キック  
ボタン1 = 中キック  
ボタン2 = 弱パンチ  
ボタン3 = 中パンチ  
ボタン4 = 弱中強パンチ同時押し  
ボタン5 = 強パンチ  
ボタン6 = 弱中強キック同時押し  
ボタン7 = 強キック  

コントローラースキンが「DualPad」の場合の初期キーコンフィグは次の通りです。  

ボタン0 = 弱キック  
ボタン1 = 中キック  
ボタン2 = 弱パンチ  
ボタン3 = 中パンチ  
ボタン4 = 強パンチ  
ボタン5 = 強キック  
ボタン6 = 弱中強パンチ同時押し  
ボタン7 = 弱中強キック同時押し  

独自のキーコンフィグを設定したい場合は、カスタムCSSで設定してください。  
配信ソフトOBSの場合は、ソース内の本ソフトウェアのプロパティを開くことで「カスタムCSS」を設定できます。

標準でキーコンフィグプリセットを用意しており、「`index.html?styles=ArcadeController,B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK`」のようにパラメーターで指定することができます。  
**「styles」パラメーターを指定する時は、コントローラースキンの指定を忘れない**ようにしてください（キーログのみ指定するとコントローラーが表示されない場合があります）。  

標準で用意しているキーコンフィグのプリセットは次の通りです（独自のキーコンフィグの設定する際の参考にもなるかと思います）。

## KeyLog_ButtonSymbol_PS_DualShock
DualShock4（PlayStation4純正パッド）を使用して、コントローラーに表示されているアイコンをキーログに表示する場合のキーコンフィグプリセットになります。  
DualShockのボタン番号に合わせているため、非純正のDualShock風コントローラーでは正常に動作しない場合があります。  

日本国内向けのDualShockで設定・確認を行ったため、海外仕様のDualShockでも正常に動作しない可能性はあります。  

「`index.html?styles=DualPad,KeyLog_ButtonSymbol_PS_DualShock`」のようにパラメーター設定をしてください。  

## B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK
ボタン0 = 弱キック  
ボタン1 = 中キック  
ボタン2 = 弱パンチ  
ボタン3 = 中パンチ  
ボタン4 = 弱パンチ・弱キック同時押し  
ボタン5 = 強パンチ  
ボタン6 = 強パンチ・強キック同時押し  
ボタン7 = 強キック  

ストリートファイターVでR1ボタンに投げを、R2ボタンにVトリガーを設定した場合の標準的なキーコンフィグになります。  
一般的なアケコンなどのボタン配置（番号）のため、PS4純正パッドなどには向きません。  

### CSS（キーコンフィグ）の解説
~~~
/* [Styles: B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button */
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul[class*="Button_"] > li:not(:nth-child(1))::after {
  /* コマンド入力（➡）以外の標準設定されているパンチやキックのアイコンの設定をリセット */
  content: unset;
}
/* [Styles: B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Punch: Light （弱パンチ） */
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_2 > li:nth-child(11)::after,
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_4 > li:nth-child(11)::after {
  content: "\1F44A";  /* パンチアイコン（ユニコード） */
  background-color: #00ffff;  /* 青色 */
}
/* [Styles: B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Punch: Med （中パンチ） */
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_3 > li:nth-child(13)::after {
  content: "\1F44A";  /* パンチアイコン（ユニコード） */
  background-color: #ffff00;  /* 黄色 */
}
/* [Styles: B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Punch: Heavy （強パンチ） */
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_5 > li:nth-child(15)::after,
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_6 > li:nth-child(15)::after {
  content: "\1F44A";  /* パンチアイコン（ユニコード） */
  background-color: #ff0000;  /* 赤色 */
}
/* [Styles: B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Kick: Light （弱キック） */
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_0 > li:nth-child(21)::after,
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_4 > li:nth-child(21)::after {
  content: "\1F9B6";  /* キックアイコン（ユニコード） */
  background-color: #00ffff;  /* 青色 */
  transform: rotate(60deg);  /* アイコンの傾き */
}
/* [Styles: B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Kick: Med （中キック） */
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_1 > li:nth-child(23)::after {
  content: "\1F9B6";  /* キックアイコン（ユニコード） */
  background-color: #ffff00;  /* 黄色 */
  transform: rotate(60deg);  /* アイコンの傾き */
}
/* [Styles: B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK] Key Log: Button: Kick: Heavy （強キック） */
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_7 > li:nth-child(25)::after,
#GameInputDisplay[data-styles~="B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK"] > #GIDKeyLog > ul.Button_6 > li:nth-child(25)::after {
  content: "\1F9B6";  /* キックアイコン（ユニコード） */
  background-color: #ff0000;  /* 赤色 */
  transform: rotate(60deg);  /* アイコンの傾き */
}
~~~

攻撃ボタンのキーコンフィグのみの変更のため、攻撃ボタンの設定のみリセットし、各ボタン番号にアイコン・色などを設定し直しています。  

アイコンを表示するためのブランクのliタグは100個あり（「li:nth-child(n)」で個別指定が可能）、1番目（「li:nth-child(1)」以外に弱中強のパンチやキックを割り当てます。  
ここでは次のように割り当てています。  

- li:nth-child(11) = 弱パンチ  
- li:nth-child(13) = 中パンチ  
- li:nth-child(15) = 強パンチ  
- li:nth-child(21) = 弱キック  
- li:nth-child(23) = 中キック  
- li:nth-child(25) = 強キック  

2～100番であればお好きな番号を割り当てることができ、連番でも大丈夫です（番号でキーログの表示順も管理しています）。  
ただし異なるアクションに対して同じ番号を指定すると設定が上書きされてしまいますし、同一のアクションに対して複数の番号を割り当てると同じアクションが同時に複数表示される場合があります。  

また投げなどのアクションを追加し番号を割り当てることもできます。  

アクション（パンチやキックなど）にボタン番号とアイコン番号が紐付けば、後はCSSの書式に応じてスタイル（アイコンや色など）を指定していくだけです。  

ボタン番号は「Button_n」のように管理されており、ボタン番号が「3」の場合は「Button_3」となります。  
お使いのコントローラーのボタン番号は、デバッグモードで確認することができます。  

カスタマイズしたキーコンフィグは「B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VTrigger_B7HK」を別のスタイル名に書き換えてカスタムCSSとして設定しておけば、必要に応じてstylesパラメーターでキーコンフィグを切り替えることができます。  

**スタイル名は半角英数字のみを推奨**します（全角文字や一部の記号などは不具合の原因になりやすいため）。  
スタイル名はコントローラースキンでも使用しており、スタイル名が被ると他のコントローラースキンやキーコンフィグと干渉する恐れがあるため、**スタイル名が他と被らないように注意**してください。  

## B0LK_B1MK_B2LP_B3MP_B4Throw_B5HP_B6VShift_B7HK
ボタン0 = 弱キック  
ボタン1 = 中キック  
ボタン2 = 弱パンチ  
ボタン3 = 中パンチ  
ボタン4 = 弱パンチ・弱キック同時押し  
ボタン5 = 強パンチ  
ボタン6 = 強パンチ・中キック同時押し  
ボタン7 = 強キック  

ストリートファイターVでR1ボタンに投げを、R2ボタンにVシフトを設定した場合の標準的なキーコンフィグになります。  
一般的なアケコンなどのボタン配置（番号）のため、PS4純正パッドなどには向きません。  

## Front6PadForLelouGuile
ボタン0 = 弱キック  
ボタン1 = 中キック  
ボタン2 = 弱パンチ  
ボタン3 = 中パンチ  
ボタン4 = 強パンチ  
ボタン5 = 弱中パンチ同時押し  
ボタン6 = 強キック  
ボタン7 = 弱中キック同時押し  
ボタン10 = 十字キー上入力  

このキーコンフィグは特殊で、本ソフトウェアの開発者がストリートファイターVをプレイする時のキーコンフィグになります（6ボタンパッドを使用）。  

攻撃ボタンは右手でのみ操作し、EX技の強度（弱中・弱強・中強）の入力にも対応できる配置になっています。  
投げ・Vスキル・Vトリガー・Vシフトは複数のボタンを同時押しして行います。  

また上入力は通常の十字キーの上（ボタン番号「12」）から、L1ボタンの位置（左手人差し指）に移動しています（ボタン番号「10」）。  
これによりパッドでも下入力を維持したまま上入力行えるようになり、HitBoxなどと同じように引きつけサマーソルトキックなどが出しやすくなります。  

そのためキーコンフィグはアクションアイコンだけでなく、コマンド入力（方向キー）のカスタマイズも行っています。

## コマンド表示（方向キー）
左右がどちらも入力されている場合は、左右両矢印を表示します。  
ただし上下の入力もされている場合は、左右の入力は無視し、上矢印か下矢印を表示します。  

上下がどちらも入力されている場合は、上入力を優先します。  

# オリジナルのコントローラースキンの作り方
本ソフトウェアをダウンロードしてご利用の場合は、スキンの画像ファイルを直接編集することでオリジナルスキンを自作することが可能です。  

画像の寸法は同一スキンで使用する画像がすべて同じであれば、変更可能です（自動的にサイズ調整して表示されます）。  
**寸法が異なる画像があるとCSSなどで表示位置の調整が必要になる**場合があります。

スキンはベースとなる「Base.png」と押したボタンの差分画像の組み合わせで構成しています。  
なお、スキンフォルダ内の「Active.png」は差分画像ファイルを作成する時に使用したもので、スキンの表示には使用していないため削除しても大丈夫です。  

# ボタン番号資料

## DualSHock4（PlayStation4純正パッド）

- ボタン0 = ×
- ボタン1 = 〇
- ボタン2 = □
- ボタン3 = △
- ボタン4 = L1
- ボタン5 = R1
- ボタン6 = L2
- ボタン7 = R3
- ボタン8 = SHARE
- ボタン9 = OPTIONS
- ボタン10 = L3（左スティック押込）
- ボタン11 = R3（左スティック押込）
- ボタン12 = 上（十字ボタン）
- ボタン13 = 下（十字ボタン）
- ボタン14 = 左（十字ボタン）
- ボタン15 = 右（十字ボタン）
- ボタン16 = PSボタン
- ボタン17 = タッチパッド／タッチパッドボタン

日本国内向けのDualShockの情報のため、グローバル仕様とは異なる可能性があります（伝統的に×ボタンと〇ボタンの扱いが海外と日本では異なることがあるため）。

# Author
[神戸ルル（Code Lelou）](https://twitter.com/codelelou)
