"ui";
/**
 * const 在main.js中定义的变量, 在其他js模块中可以直接使用
 */
const rootPath = engines.myEngine().cwd();
const Global = require( "./src/modules/global" );
const CFG = require( "./src/modules/objConfig" );
const cfg = CFG.getConfig();
const UIParms = require( "./src/modules/uiparms" );
const uiparms = UIParms.getUIParms();

$ui.statusBarColor( uiparms.color.body.statusbar );

const G_Storage = storages.create( "com.dcrclub.chatbot" );
const mViewManager = new Global.viewManager();
const viewGroup = mViewManager.getViewGroup();

const mUUID = new Global.GUUID();
let G_UUID = mUUID.getUUID();
if ( !G_UUID || G_UUID == "" ) {
    mUUID.createUUID();
    G_UUID = mUUID.getUUID();
}

mViewManager.addViewToRoot( viewGroup.mainActivity );

mViewManager.addViewToParint( viewGroup.msg_edit, $ui.mainbody );
require( "./src/viewlogic/mainview" );