module.exports = ( function() {
    require( "./androidClass" );
    require( "./customui" );
    let objectRoot = engines.myEngine().cwd();

    this.viewManager = function() {
        let rootView = activity.window.decorView;
        this.getViewGroup = function() {
            let viewFileList = getFilesList();
            let viewGroup = {};
            for ( let i in viewFileList ) {
                let path = viewFileList[ i ];
                let fileName = getFileName( path );
                viewGroup[ fileName ] = GreateView( path );
            }
            return viewGroup
        }
        function GreateView( viewFilePath ) {
            return $ui.inflate( files.read( viewFilePath, 'utf-8' ), rootView );
        }
        function getFilesList() {
            let path = objectRoot + "/res/layout/";
            let fileList = files.listDir( path, function( n ) {
                return n.endsWith( ".xml" ) && files.isFile( files.join( path, n ) );
            } );
            for ( let i in fileList ) {
                fileList[ i ] = files.join( path, fileList[ i ] );
            }
            return fileList;
        }
        function getFileName( filePath ) {
            let name = files.getName( filePath );
            let nameArray = name.split( "." );
            let filename = nameArray[ 0 ];
            return filename;
        }
    
        this.addViewToRoot = function( view ) {
            $ui.setContentView( view );
        }
        this.removeViewFromRoot = function( view ) {
            rootView.removeView( view );
        }
        this.addViewToParint = function( childView, parintView ) {
            parintView.addView( childView );
        }
        
    }
    this.GUUID = function() {
        this.createUUID = function() {
            let uuid = UUID.randomUUID();
            G_Storage.put( "uuid", uuid );
        }
        this.getUUID = function() {
            return G_Storage.get( "uuid" );
        }
        this.resetUUID = function() {
            G_Storage.put( "uuid", "" );
            this.createUUID();
        }
    }

    this.debugManager = function() {
        let debugType = false;
        this.setDebugType = function( type ) {
            debugType = type;
        }
        this.debugLog = function( str ) {
            if ( debugType ) {
                console.log( str );
            }
        }
    }

    return this;
} )()