function loopThread() {
    let config = {
        isBreak : false
    }

    this.setStatus = function( type ) {
        config.isBreak = type;
    }
    this.getStatus = function() {
        return config.isBreak;
    }
    this.loop = function() {
        while( true ) {
            if ( config.isBreak ) {
                break;
            }
            sleep( 1e3 );
            console.log( "is running" );
        }
    }
}

let Loop = new loopThread();
Loop.loop();

sleep( 5e3 );
Loop.setStatus( true );
