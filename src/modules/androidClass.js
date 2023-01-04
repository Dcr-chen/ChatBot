module.exports = ( function() {

    const classFile = rootPath + "/src/androidClass"
    let classArray = [];

    let f = files.read( classFile );
        classArray = f.split( "\n" );
    
    if ( classArray.length > 0 ) {
        for ( let i in classArray ) {
            let classname = classArray[ i ];
            importClass( classname );
        }
    }

    return this;
} )()