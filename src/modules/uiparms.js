module.exports = ( function() {

    let style = {
        font : {
            body : {
                size    : 16,
                family  : "sans-serif",
                color   : "#000000",
            },
            titlebar : {
                size    : 18,
                family  : "sans-serif",
                color   : "#ffffff",
            },
            messageitem : {
                size    : 14,
                family  : "sans-serif",
                color   : "#FFFFFF",
            },
            messageInput : {
                size    : 14,
                family  : "sans-serif",
                color   : "#FFFFFF",
            }
        },
        color : {
            body : {
                background  : "#0F0F0F",
                msgbox      : "#262626",
                sendbutton  : "#0066CC",
                inputbox    : "#FAFAFA",
                titlebar    : "#000000",
                statusbar   : "#000000",
            },
            msgitem : {
                background : "#262626"
            }
        }
    }

    this.getUIParms = function() {
        return style;
    }

    return this;
} )()