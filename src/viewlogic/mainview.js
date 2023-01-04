module.exports = ( function() {

    viewFilePath = rootPath + "/res/layout/msg_item.xml";
    msgItem = files.read( viewFilePath, 'utf-8' );

    let chatbotMsgBackgroundImg = rootPath + "/res/images/point9/cgg.9.png";
    chatbotMsgBackgroundImg = files.path( chatbotMsgBackgroundImg );

    let selfMsgBackgroundImg = rootPath + "/res/images/point9/cbp.9.png";
    selfMsgBackgroundImg = files.path( selfMsgBackgroundImg );

    let msgInputBoxBackgroundImg = rootPath + "/res/images/point9/ged.9.png";
    msgInputBoxBackgroundImg = files.path( msgInputBoxBackgroundImg );
    setBackground( $ui.input_text, msgInputBoxBackgroundImg );

    let msgSendButtonBackgroundImg = rootPath + "/res/images/point9/cgl.9.png";
    msgSendButtonBackgroundImg = files.path( msgSendButtonBackgroundImg );
    setBackground( $ui.send_btn, msgSendButtonBackgroundImg );
    
    let MSG = new Msg();
    let recyclerView = $ui.msg_recycler_view;
    let layoutManager = new LinearLayoutManager( context );
    recyclerView.setLayoutManager( layoutManager );

    let MsgAdapter = new mMsgAdapter();
    let msgList = MsgAdapter.msgList;
    msgList.push( new Msg( "您有什么想问的吗?", MSG.TYPE_RECEIVED ) );
    
    recycleAdapter = MsgAdapter.MsgAdapter;
    recyclerView.setAdapter( recycleAdapter );

    $ui.send_btn.on( "click", function() {
        let msgText = $ui.input_text.getText().toString();
        if ( msgText.length > 0 ) {
            postToChatgtp( msgText )
            msgList.push( new Msg( msgText, MSG.TYPE_SEND ) );
            recycleAdapter.notifyItemInserted( msgList.length - 1 );
            recyclerView.scrollToPosition( msgList.length - 1 );
            $ui.input_text.setText( "" );
        }
    } );

    function postToChatgtp( str ) {
        if ( str == "重置会话" ) {
            mUUID.resetUUID();
            G_UUID = mUUID.getUUID();
        }
        console.log( G_UUID );
        let url = cfg.server.url;
        let data = {
            msg : str,
            uuid : G_UUID,
        }
        http.postJson( url, data, {}, function( res, err ) {
            if ( err ) {
                toastLog( err );
                return;
            }
            let result = res.body.json();
            let msg = result.data.msg;
            $ui.run( () => {
                msgList.push( new Msg( msg, MSG.TYPE_RECEIVED ) );
                recycleAdapter.notifyItemInserted( msgList.length - 1 );
                recyclerView.scrollToPosition( msgList.length - 1 );
            } );
        } );
    }

    function mMsgAdapter() {
        this.msgList = [];
        let that = this;
        this.MsgAdapter = RecyclerView.Adapter( {
            onCreateViewHolder: function( parent, viewType ) {
                let view, holder;
                view = ui.inflate( msgItem, parent, false );
                holder = JavaAdapter( RecyclerView.ViewHolder, {}, view );
                return holder;
            },
            onBindViewHolder: function( holder, position ) {
                let msg = that.msgList[ position ];
                
                if ( msg.getType() == MSG.TYPE_RECEIVED ) {
                    holder.itemView.leftLayout.setVisibility( View.VISIBLE );
                    holder.itemView.left_msg.setText( msg.getMsgText() );
                    setBackground( holder.itemView.left_msg, chatbotMsgBackgroundImg );
                    holder.itemView.rightLayout.setVisibility( View.GONE );
                } else if ( msg.getType() == MSG.TYPE_SEND ) {
                    holder.itemView.rightLayout.setVisibility( View.VISIBLE );
                    holder.itemView.right_msg.setText( msg.getMsgText() );
                    setBackground( holder.itemView.right_msg, selfMsgBackgroundImg );
                    holder.itemView.leftLayout.setVisibility( View.GONE );
                }
            },
            getItemCount: function() {
                return that.msgList.length;
            }
        } );
    }

    function Msg( content, type ) {
        this.TYPE_RECEIVED = 0;
        this.TYPE_SEND = 1;

        let msgText = content;
        let type = type;

        this.getMsgText = function() {
            return msgText;
        }
        this.getType = function() {
            return type;
        }
    }

    function setBackground( view, path ) {
        bitmap = BitmapFactory.decodeFile( path )
        chunk = bitmap.getNinePatchChunk();
        npd = new NinePatchDrawable( context.getResources(), bitmap, chunk, new Rect(), null );
        view.setBackground( npd );
    }


    return this;
} )()