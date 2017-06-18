$.fn.getType = function() {

    return this[ 0 ].tagName == "INPUT" ? this[ 0 ].type.toLowerCase() : this[ 0 ].tagName.toLowerCase();
};

$.fn.serializeObject = function( is ) {

    var $this = $( this );
    var obj = {};
    var param = "";
    var disabled = $this.find( '[disabled]' ).prop( 'disabled' , false );

    $.each( $this.serializeArray() , function( i , o ) {

        var n = o.name , v = o.value;
        v = v.replace( /%/g , '' );
        obj[ n ] = obj[ n ] === undefined ? v : $.isArray( obj[ n ] ) ? obj[ n ].concat( v ) : [
                obj[ n ] , v
        ];
    } );

    Object.keys( obj ).forEach( function( k ) {

        // datepicker element 특수문자 - / 제거
        if ( $this.find( "#" + k ).attr( 'data-type' ) == 'datepicker' && is == undefined ) {
            param += "&" + k + "=" + obj[ k ].replace( /-/gi , '' ).replace( /\//gi , '' );
        } else {
            // param += "&" + k + "=" + obj[ k
            // ].replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,"");
            param += "&" + k + "=" + obj[ k ];
        }
    } );

    disabled.prop( 'disabled' , true );

    return param.substring( 1 );
};

$.fn.serializeJson = function( field ) {

    var $this = $( this );
    var obj = {};
    var param = "";
    var disabled = $this.find( '[disabled]' ).prop( 'disabled' , false );

    $.each( $this.serializeArray() , function( i , o ) {

        var n = o.name , v = o.value;
        if ( $this.find( "#" + n ).attr( 'data-type' ) == 'datepicker' ) {
            v = v.replace( /-/gi , '' ).replace( /\//gi , '' );
        } else {
            // v = v.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,"");
            v = v;
            v = v.replace( /%/g , '' );
        }
        obj[ n ] = obj[ n ] === undefined ? v : $.isArray( obj[ n ] ) ? obj[ n ].concat( v ) : [
                obj[ n ] , v
        ];
    } );

    if ( field != undefined ) {
        $.each( field , function( i , o ) {

            if ( obj[ o ] == undefined ) {
                obj[ o ] = "";
            }
        } );
    }

    disabled.prop( 'disabled' , true );

    return obj;
};

$.fn.dataInit = function( url ) {

    var $this = $( this );
    var $control = $this.find( '[data-code]' );
    var $datepicker = $this.find( '[data-type="datepicker"]' );
    var param = {};
    var result = {};
    var tag = '';
    var is = true;
    $control.each( function() {

        if ( $( this ).attr( 'data-code' ) ) {
            param[ $( this ).attr( 'id' ) ] = $( this ).attr( 'data-code' );
        }
    } );

    $datepicker.each( function() {

        $( this ).datepicker().mask( "9999-99-99" );
        if ( $( this ).attr( "data-select" ) != undefined ) {
            $( this ).val( getDate( $( this ).attr( "data-select" ) * 1 ) );
        }
    } );

    ajaxExtP( url , "POST" , param , false , false , function( data ) {

        $control.each( function() {

            switch ( $( this ).attr( 'data-type' ) ) {
                case "select" :
                    $select = $( this );
                    tag = '<select class="sel iwd100" id="' + $( this ).attr( 'id' ) + '" name="' + $( this ).attr( 'id' ) + '">';
                    if ( $select.attr( 'data-select' ) ) {
                        tag += '<option value="">' + $( this ).attr( 'data-select' ) + '</option>';
                    } else {
                        if ( $select.attr( 'data-select' ) == '' ) {
                            tag += '<option value="">전체</option>';
                        }
                    }
                    $.each( data[ $( this ).attr( 'id' ) ] , function( key , value ) {

                        is = true;
                        if ( $select.attr( 'data-remove' ) ) {
                            var separated = $select.attr( 'data-remove' ).split( ',' );
                            $.each( separated , function( index , data ) {

                                if ( value[ "cd" ] == data ) {
                                    is = false;
                                }
                            } );
                        }

                        if ( is ) {
                            tag += '<option value="' + value[ "cd" ] + '">' + value[ "cdNm" ] + '</option>';
                        }
                    } );
                    tag += '</select>';
                    $select.html( tag );
                break;
                case "radio" :
                    tag = '';
                    $radio = $( this );
                    if ( $radio.attr( 'data-select' ) ) {
                        tag += '<input type="radio" id="' + $radio.attr( 'name' ) + '" name="' + $radio.attr( 'name' ) + '" value="" />'
                                + $radio.attr( 'data-select' ) + '&nbsp;&nbsp;';
                    }
                    $.each( data[ $( this ).attr( 'id' ) ] , function( key , value ) {

                        is = true;
                        if ( $radio.attr( 'data-remove' ) ) {
                            var separated = $radio.attr( 'data-remove' ).split( ',' );
                            $.each( separated , function( index , data ) {

                                if ( value[ "cd" ] == data ) {
                                    is = false;
                                }
                            } );
                        }
                        if ( is ) {
                            tag += '<input type="radio" id="' + $radio.attr( 'name' ) + '" name="' + $radio.attr( 'name' ) + '" value="'
                                    + value[ "cd" ] + '" />' + value[ "cdNm" ] + '&nbsp;&nbsp;';
                        }
                    } );
                    $radio.html( tag );
                break;
                case "checkbox" :
                    $checkbox = $( this );
                    tag = '<input type="checkbox" id="' + $( this ).attr( 'id' ) + '" name="' + $( this ).attr( 'id' )
                            + '" value="" checked />전체&nbsp;&nbsp;';
                    $.each( data[ $( this ).attr( 'id' ) ] , function( key , value ) {

                        is = true;
                        if ( $checkbox.attr( 'data-remove' ) ) {
                            var separated = $checkbox.attr( 'data-remove' ).split( ',' );
                            $.each( separated , function( index , data ) {

                                if ( value[ "cd" ] == data ) {
                                    is = false;
                                }
                            } );
                        }

                        if ( is ) {
                            tag += '<input type="checkbox" id="' + $checkbox.attr( 'id' ) + '" name="' + $checkbox.attr( 'id' ) + '" value="'
                                    + value[ "cd" ] + '" />' + value[ "cdNm" ] + '&nbsp;&nbsp;';
                        }
                    } );
                    $checkbox.html( tag );
                break;
            }
        } );
    } );

    $control.each( function() {

        switch ( $( this ).attr( 'data-type' ) ) {
            case "checkbox" :
                $( '#' + $( this ).attr( 'id' ) + ' input:checkbox' ).on( 'click' , function() {

                    var $this = $( this ) , name = $this.attr( 'id' ) , $allInput = $( 'input[name=' + name + ']' ) , isAll = $this.val() == '';
                    if ( $this.val() != '' && $( 'input[name=' + name + ']:checked' ).length == ( $allInput.length - 1 ) ) {
                        isAll = true;
                    }
                    if ( isAll ) {
                        $allInput.attr( 'checked' , false )
                        $( '#' + $( this ).attr( 'id' ) + ' input[value=""]' ).prop( 'checked' , true );
                    } else {
                        if ( $( 'input[name=' + name + ']:checked' ).length == 0 ) {
                            $( '#' + $( this ).attr( 'id' ) + ' input[value=""]' ).prop( 'checked' , true );
                        } else {
                            $( '#' + $( this ).attr( 'id' ) + ' input[value=""]' ).prop( 'checked' , false );
                        }
                    }
                } );
            break;
        }
    } );
};

$.fn.dataReload = function( url , param , value ) {

    var $this = $( this );

    param[ "id" ] = $( this ).attr( 'id' );
    param[ "cmmCdDvsnCd" ] = $( this ).attr( 'data-code' );
    ajaxExtP( url , "POST" , param , false , false , function( data ) {

        switch ( $this.attr( 'data-type' ) ) {
            case "select" :
                tag = '<select class="sel iwd100" id="' + $( this ).attr( 'id' ) + '" name="' + $( this ).attr( 'id' ) + '">';
                if ( $this.attr( 'data-select' ) ) {

                    tag += '<option value="">' + $( this ).attr( 'data-select' ) + '</option>';
                } else {
                    if ( $this.attr( 'data-select' ) == '' ) {
                        tag += '<option value="">전체</option>';
                    }
                }

                $.each( data[ $this.attr( 'id' ) ] , function( key , value ) {

                    tag += '<option value="' + value[ "cd" ] + '">' + value[ "cdNm" ] + '</option>';
                } );
                tag += '</select>';
                $this.html( tag );
                if ( value ) {
                    $this.val( value );
                    $this.change();
                }
            break;
            case "radio" :
                tag = '';
                if ( $this.attr( 'data-select' ) ) {
                    tag += '<input type="radio" id="' + $this.attr( 'name' ) + '" name="' + $this.attr( 'name' ) + '" value="" />'
                            + $radio.attr( 'data-select' ) + '&nbsp;&nbsp;';
                }
                $.each( data[ $( this ).attr( 'id' ) ] , function( key , value ) {

                    is = true;
                    if ( $this.attr( 'data-remove' ) ) {
                        var separated = $this.attr( 'data-remove' ).split( ',' );
                        $.each( separated , function( index , data ) {

                            if ( value[ "cd" ] == data ) {
                                is = false;
                            }
                        } );
                    }
                    if ( is ) {
                        tag += '<input type="radio" id="' + $this.attr( 'name' ) + '" name="' + $this.attr( 'name' ) + '" value="' + value[ "cd" ]
                                + '" />' + value[ "cdNm" ] + '&nbsp;&nbsp;';
                    }
                } );
                $this.html( tag );
            break;
        }
    } );
};

$.fn.dataBind = function( json ) {

    var $this = $( this );
    $.each( json , function( key , value ) {

        var control = $this.find( '[name=' + key + ']' );
        if ( control.length > 0 ) {
            switch ( control.getType() ) {
                case "div" :
                    var div = control.find( '[name=' + key + ']' );
                    switch ( div.getType() ) {
                        case "radio" :
                            control.find( '[name="' + key + '"]' ).prop( 'checked' , false );
                            control.find( '[name="' + key + '"][value="' + ( value == null ? "" : value ) + '"]' ).prop( 'checked' , true );
                            control.change();
                        break;
                        case "checkbox" :
                            var separated = value.split( ',' );

                            control.find( '[name="' + key + '"]' ).prop( 'checked' , false );
                            $.each( separated , function( i , o ) {

                                control.find( '[name="' + key + '"][value="' + ( o == null ? "" : o ) + '"]' ).prop( 'checked' , true );
                            } );
                        break;
                    }
                break;
                case "radio" :
                    $this.find( '[name="' + key + '"][value="' + ( value == null ? "" : value ) + '"]' ).prop( 'checked' , true );
                break;
                case "checkbox" :
                    $this.find( '[name="' + key + '"][value="' + ( value == null ? "" : value ) + '"]' ).prop( 'checked' , true );
                break;
                default :
                    control.val( value );
                    control.change();
                break;
            }
        } else {

            if ( $this.find( '[name=' + key + ']' ).length == 0 ) {
                var hiddenField = document.createElement( "input" );
                hiddenField.setAttribute( "type" , "hidden" );
                hiddenField.setAttribute( "name" , key );
                hiddenField.setAttribute( "value" , value );

                $this.append( hiddenField );
            } else {
                $this.find( '[name=' + key + ']' ).val( "" );
            }
        }
    } );
};

$.fn.dataBind2 = function( json , key , value , width ) {

    var $this = $( this );
    if ( isEmpty( width ) ) {
        tag = '<select class="sel iwd150" id="' + $this.attr( 'id' ) + '" name="' + $this.attr( 'id' ) + '">';
    } else {
        tag = '<select class="sel iwd"' + width + '" id="' + $this.attr( 'id' ) + '" name="' + $this.attr( 'id' ) + '">';
    }
    if ( $this.attr( 'data-select' ) ) {
        tag += '<option value="">' + $this.attr( 'data-select' ) + '</option>';
    } else {
        if ( !$this.attr( 'data-select' ) == '' ) {
            tag += '<option value="">전체</option>';
        }
    }
    $.each( json , function( i , o ) {

        tag += '<option value="' + o[ key ] + '">' + o[ value ] + '</option>';
    } );
    tag += '</select>';
    $this.html( tag );
};

$.fn.attrBind = function( json ) {

    var $this = $( this );
    $.each( json , function( key , value ) {

        var control = $this.find( '[name=' + key + ']' );
        if ( control.length > 0 ) {
            var result = value.split( "," );
            control.attr( result[ 0 ] , result[ 1 ] );
        }
    } );
};

$.fn.disabledAll = function( is ) {

    var $this = $( this );

    $this.find( 'input[type="text"]' ).each( function() {

        $( this ).prop( 'disabled' , is );
    } );

    $this.find( 'input[type="radio"]' ).each( function() {

        $( this ).prop( 'disabled' , is );
    } );

    $this.find( 'select' ).each( function() {

        $( this ).prop( 'disabled' , is );
    } );

    $this.find( 'textarea' ).each( function() {

        $( this ).prop( 'disabled' * is );
    } );

};

$.fn.disabledArray = function( list , is ) {

    var $this = $( this );
    $.each( list , function( key , value ) {

        $this.find( '[name="' + value + '"]' ).prop( 'disabled' , is );
    } );
};

$.fn.hiddenArray = function( list , is ) {

    var $this = $( this );
    $.each( list , function( key , value ) {

        $this.find( '[name="' + value + '"]' ).prop( 'hidden' , is );
    } );
};

$.fn.keyPress = function( func ) {

    var $this = $( this );
    $this.find( 'input[type="text"]' ).each( func );
};

$.fn.paging = function( currPage , pageSize , totalSize , func ) {

    this.show();

    var lastPage = 1 , startPage = 1 , endPage = 1;
    if ( currPage == undefined ) {
        currPage = 1;
    }
    if ( totalSize == undefined ) {
        this.find( 'a.pagefirst' ).hide();
        this.find( 'a.pageprev' ).hide();
        this.find( 'a.pagenext' ).hide();
        this.find( 'a.pagelast' ).hide();
        this.find( 'div[class="list"]' ).html( "" );
        return;
    }

    lastPage = Math.ceil( totalSize / pageSize );

    startPage = parseInt( currPage / 10 ) * 10 + 1;
    if ( startPage < 1 ) {
        startPage = 1;
    } else {
        if ( parseInt( currPage % 10 ) == 0 ) {
            startPage = parseInt( currPage / 10 ) > 1 ? ( parseInt( currPage / 10 ) * 10 - 9 ) : 1;
        }
    }
    endPage = startPage + 9;
    if ( endPage >= lastPage ) {
        endPage = lastPage;
    }

    var tag = '';
    for ( var i = startPage; i <= endPage; i++ ) {
        if ( func == undefined ) {
            if ( currPage == i ) {
                tag += "<a href=\"javascript:doSearch(" + i + ");\" class=\"on\"><span>" + i + "</span></a>";
            } else {
                tag += "<a href=\"javascript:doSearch(" + i + ");\" class=\"page\"><span>" + i + "</span></a>";
            }
        } else {
            if ( currPage == i ) {
                tag += "<a href=\"javascript:" + func + "(" + i + ");\" class=\"on\"><span>" + i + "</span></a>";
            } else {
                tag += "<a href=\"javascript:" + func + "(" + i + ");\" class=\"page\"><span>" + i + "</span></a>";
            }
        }
    }

    this.find( 'div[class="list"]' ).html( tag );
    if ( startPage < 10 ) {
        this.find( 'a.pagefirst' ).hide();
        this.find( 'a.pageprev' ).hide();
    } else {
        this.find( 'a.pagefirst' ).show();
        this.find( 'a.pageprev' ).show();
        if ( func == undefined ) {
            this.find( 'a.pagefirst' ).attr( "href" , "javascript:doSearch(" + ( 1 ) + ");" );
            this.find( 'a.pageprev' ).attr( "href" , "javascript:doSearch(" + ( startPage - 10 ) + ");" );
        } else {
            this.find( 'a.pagefirst' ).attr( "href" , "javascript:" + func + "(" + ( 1 ) + ");" );
            this.find( 'a.pageprev' ).attr( "href" , "javascript:" + func + "(" + ( startPage - 10 ) + ");" );
        }
    }

    if ( startPage + 10 > lastPage ) {
        this.find( 'a.pagenext' ).hide();
        this.find( 'a.pagelast' ).hide();
    } else {
        this.find( 'a.pagenext' ).show();
        this.find( 'a.pagelast' ).show();
        if ( func == undefined ) {
            this.find( 'a.pagenext' ).attr( "href" , "javascript:doSearch(" + ( startPage + 10 ) + ");" )
            this.find( 'a.pagelast' ).attr( "href" , "javascript:doSearch(" + ( lastPage ) + ");" )
        } else {
            this.find( 'a.pagenext' ).attr( "href" , "javascript:" + func + "(" + ( startPage + 10 ) + ");" );
            this.find( 'a.pagelast' ).attr( "href" , "javascript:" + func + "(" + ( lastPage ) + ");" );
        }
    }
};

// 숫자 타입에서 쓸 수 있도록 format() 함수 추가
Number.prototype.format = function() {

    if ( this == 0 )
        return 0;

    var reg = /(^[+-]?\d+)(\d{3})/;
    var n = ( this + '' );

    while ( reg.test( n ) )
        n = n.replace( reg , '$1' + ',' + '$2' );

    return n;
};

// 문자열 타입에서 쓸 수 있도록 format() 함수 추가
String.prototype.format = function() {

    var num = parseFloat( this );
    if ( isNaN( num ) )
        return "0";

    return num.format();
};

/*******************************************************************************
 * jqGrid Helper
 ******************************************************************************/
// data clear
$.fn.clearGridData = function() {

    return $( this ).jqGrid( "clearGridData" , true );
}

// select 초기화
$.fn.resetSelection = function() {

    return $( this ).jqGrid( 'resetSelection' );
}

// select 초기화
$.fn.setSelection = function( rowindex ) {

    return $( this ).jqGrid( 'setSelection' , rowindex );
}

// max rowId
$.fn.maxRowId = function() {

    var rowId = 0;
    var ids = $( this ).jqGrid( 'getDataIDs' );
    for ( var i = 0; i < ids.length; i++ ) {
        if ( Number( rowId ) <= Number( ids[ i ] ) ) {
            rowId = ids[ i ];
        }
    }
    rowId = Number( rowId ) + 1;
    return rowId;
}

// 선택된 rowid를 리턴해 준다.
$.fn.selectRow = function() {

    return $( this ).getGridParam( 'selrow' );
}

// 선택된 rowid를 리턴해 준다.(multiselect option이 true인 경우)
$.fn.selectRows = function() {

    return $( this ).getGridParam( 'selarrrow' );
}

// rowData 전체를 리턴해 준다.
$.fn.getRows = function() {

    return $( this ).jqGrid( 'getGridParam' , 'data' );
};

// 넘겨 받은 rowid에 해당하는 rowData를 리턴해 준다.
$.fn.getRowData = function( rowid ) {

    return $( this ).getRowData( rowid );
};

// row count
$.fn.getRowCount = function( rowid ) {

    return $( this ).getGridParam( "reccount" );
};

/*
 * EAM 에서 현재 접속한 메뉴의 버튼 권한 처리.
 *  1. 현재 접속한 메뉴의 등록된 버튼의 권한 정보를 받아온다. (TRUE, FALSE)
 *  2. 버튼별 권한에 따라 화면 노출.
 */
$.fn.btnAuthInit = function(menuId){
	
	var $this = $( this );
    var $btn = $this.find( '[eamBtnId]' );
	
	var param = {};
	param[ "sMenuId" ] = menuId;

	//1. 해당 메뉴의 버튼 권한을 가져온다.
	ajaxExtP( "/eip/eam/auth/btnAuthControll.do" , "POST" , param , false , false , function( data ) {
		
		//2. 버튼별 권한에 따른 화면 노출.
		$btn.each( function() {
			if( data[ $( this ).attr( 'eamBtnId' ) ] ) $( this ).show();
			else $( this ).hide();
		} );
		
	} );
};

