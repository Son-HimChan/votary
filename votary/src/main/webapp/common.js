app = function() {

    // 화면 명칭
    var pgmId = "";

    // 데이터
    var data = {};
    var param = {};
    var popupParam = [];
    var docId = "";

    // 현재 페이지
    var currPage = 1;

    this.getYear = function() {

        var now = new Date();

        return now.getFullYear();
    }
    // 현재 날짜 가져오기
    this.getDate = function(sperater , addDay) {

        var now = new Date();

        if (addDay != undefined) {
            var day = now.getDate() + addDay;
            now.setDate(day);
        }

        if (sperater != undefined) {
            return now.getFullYear() + sperater + leadingZeros((now.getMonth() + 1) , 2) + sperater + leadingZeros(now.getDate() , 2);
        } else {
            return now.getFullYear() + leadingZeros((now.getMonth() + 1) , 2) + leadingZeros(now.getDate() , 2);
        }
    }

    // 로딩
    this.onLoad = function() {

    };

    // 권한
    this.initAuth = function() {

    };

    // disabled
    this.doSetEnable = function() {

    };

    // 검색
    this.doSearch = function() {

    };

    $("#pageSize").hide();
};

messageBox = function(msg) {

    $("#msgData").text(msg);
    $("#alertWindow").animate({
        height : "40px"
    } , 500);

    setTimeout(function() {

        $("#alertWindow").animate({
            height : "0px"
        } , 500);
    } , 1500);
}

ajax = function(url , method , param , success) {

    $.ajax({
        async : true ,
        cache : false ,
        url : url ,
        data : method == "GET" ? encodeURI(param) : param ,
        type : method ,
        dataType : 'json' ,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8" ,
        success : success ,
        error : function(request , status , error) {

            // console.log(request);
            // console.log(status);
            // console.log(error);
            // alert("처리 중 오류가 발생 하였습니다. 관리자에게 문의 바랍니다.</br>Error : " +
            // error.message + " Script : " + url + " Line : " + lineNumber);
            alert("처리 중 오류가 발생 하였습니다. 관리자에게 문의 바랍니다.");
        }
    });
};

ajaxP = function(url , method , param , success) {

    $.ajax({
        async : false ,
        cache : false ,
        url : url ,
        data : method == "GET" ? encodeURI(param) : param ,
        type : method ,
        global : false ,
        dataType : 'json' ,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8" ,
        success : success ,
        error : function(request , status , error) {

            console.log("ajaxP error : " + error);
            alert("처리 중 오류가 발생 하였습니다. 관리자에게 문의 바랍니다.");
        }
    });
};

ajaxExt = function(url , method , param , isAsync , isCache , success) {

    $.ajax({
        async : isAsync ,
        cache : isCache ,
        url : url ,
        data : method == "GET" ? encodeURI(param) : param ,
        type : method ,
        dataType : 'json' ,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8" ,
        success : success ,
        error : function(request , status , error) {

            alert("처리 중 오류가 발생 하였습니다. 관리자에게 문의 바랍니다.");
        }
    });
};

ajaxExtP = function(url , method , param , isAsync , isCache , success) {

    $.ajax({
        async : isAsync ,
        cache : isCache ,
        url : url ,
        data : method == "GET" ? encodeURI(param) : param ,
        type : method ,
        global : false ,
        dataType : 'json' ,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8" ,
        success : success ,
        error : function(request , status , error) {

            alert("처리 중 오류가 발생 하였습니다. 관리자에게 문의 바랍니다.");
        }
    });
};

ajaxMenu = function(url , method , param , isAsync , isCache) {

    $(window).scrollTop(0);
    $("#container").css("width" , "1580px");
    $("#container").css("max-width" , "1600px");
    $.ajax({
        async : isAsync ,
        cache : isCache ,
        data : param ,
        type : method ,
        url : url ,
        success : function(response) { // on success..

            $('#container').html(response); // update the DIV
        } ,
        error : function(request , status , error) {

            alert("처리 중 오류가 발생 하였습니다. 관리자에게 문의 바랍니다.");
        }
    });
};

jsonConvert = function(str) {

    var obj = {};
    var separated = str.split('&');

    $.each(separated , function(i , o) {

        var temp = o.split('=');
        obj[ temp[ 0 ] ] = obj[ temp[ 0 ] ] === undefined ? temp[ 1 ] : $.isArray(obj[ temp[ 0 ] ]) ? obj[ temp[ 0 ] ].concat(temp[ 1 ]) : [
                obj[ temp[ 0 ] ] , temp[ 1 ] ];
    });

    return obj;
}

doCheckBytes = function(text) {

    var cnt = 0;
    for (var i = 0; i < text.length; i++) {
        cnt += (text.charCodeAt(i) > 128) ? 2 : 1;
    }
    return cnt;
}

isEmpty = function(data) {

    var count = 0;
    for ( var p in data) {
        count++;
    }

    if (data == undefined || count == 0) {
        return true;
    }
    return false;
}

isNotEmpty = function(data) {

    var count = 0;
    for ( var p in data) {
        count++;
    }

    if (data == undefined || count == 0) {
        return false;
    }
    return true;
}

nullToEmpty = function(data) {

    $.each(data , function(key , value) {

        if (value == null) {
            data[ key ] = '';
        } else {
            data[ key ] = value;
        }
    });

    return data;
}

selectTab = function(index) {

    setTimeout(function() {

        $(".tab_menu_s02 li").removeClass("on");
        $("#tab" + index).addClass("on");
        $(".tab_cnt_s02").css("display" , "none");
        $(".tab_box_s02_" + index).css("display" , "block");
    } , 5);
}

getDate = function(addDay) {

    var now = new Date();

    if (addDay != undefined) {
        var day = now.getDate() + addDay;
        now.setDate(day);
    }

    return now.getFullYear() + "-" + leadingZeros((now.getMonth() + 1) , 2) + "-" + leadingZeros(now.getDate() , 2);
}

dateToString = function(date , sperater) {

    if (typeof (date) == 'string') {
        return date.replace(/-/gi , '');
    } else {
        if (sperater != undefined) {
            return date.getFullYear() + sperater + leadingZeros((date.getMonth() + 1) , 2) + sperater + leadingZeros(date.getDate() , 2);
        } else {
            return date.getFullYear() + leadingZeros((date.getMonth() + 1) , 2) + leadingZeros(date.getDate() , 2);
        }
    }
}

toDate = function(psDate) {

    if (psDate == null || psDate.length < 8)
        return null;

    return new Date(psDate.substr(0 , 4) , Number(psDate.substr(4 , 2)) - 1 , psDate.substr(6 , 2));
}

leadingZeros = function(n , digits) {

    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

selectJsonData = function(json , option , text , key , value) {

    var obj = [];

    $.each(json , function(i , o) {

        var v = o[ option ] , t = o[ text ] , k = o[ key ];
        if (k == value) {
            var item = {};
            item[ option ] = v;
            item[ text ] = t;

            obj.push(item);
        }
    });

    return obj;
};

phoneNumber = function(number) {

    if (number.replace(/[^0-9]/g , '')) {
        return true;
    } else {
        return false;
    }
}

emailCheck = function(email) {

    var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
    // 입력을 안했으면
    if (email.lenght == 0) {
        return false;
    }
    // 이메일 형식에 맞지않으면
    if (!email.match(regExp)) {
        return false;
    }
    return true;
}

logAppend = function(url , log) {

    var comment = {};

    comment[ "acpDhs" ] = "조회시작일";
    comment[ "acpDhe" ] = "조회종료일";
    comment[ "reqDvsnCd" ] = "청구구분코드";
    comment[ "acpYr" ] = "접수년도";
    comment[ "rmCvptAcpNo" ] = "실민원접수번호";
    comment[ "cvptHndlStaCd" ] = "진행상태";
    comment[ "reqrKndCd" ] = "청구인종류코드";
    comment[ "cvptKndCd" ] = "민원종류코드";
    comment[ "acpRutCd" ] = "접수경로코드";
    comment[ "mngTypCd" ] = "관리유형";

    comment[ "currPage" ] = "현재페이지";
    comment[ "pageSize" ] = "페이지갯수";

    var obj = {};

    if (typeof (log) == 'string') {
        $("#logData").append("<font color='green'>" + url + "</fon><br>");
        var separated = log.toString().split('&');
        $.each(separated , function(i , o) {

            var temp = o.split('=');
            if (temp[ 1 ] != undefined) {
                $("#logData").append(
                        "<font color='red'>" + temp[ 0 ] + "</font>"
                                + (comment[ temp[ 0 ] ] == undefined ? "" : "<font color='black'>(" + comment[ temp[ 0 ] ] + ")</font>")
                                + "=<font color='blue'>" + temp[ 1 ] + "</font><br>");
            }
        });
    } else {
        $("#logData").append("<font color='green'>" + url + "</fon><br>");
        $.each(log , function(i , o) {

            if (typeof (log) == 'string') {
                $("#logData").append("<font color='red'>" + i + "</font>=<font color='blue'>" + o + "</font><br>");
            } else {
                $("#logData").append(
                        "<font color='red'>" + i + "</font>" + (comment[ i ] == undefined ? "" : "<font color='black'>(" + comment[ i ] + ")</font>")
                                + "=<font color='blue'>" + JSON.stringify(o).replace('/\r\n/gi' , '') + "</font><br>");
            }

        });
    }
}

smgCom = {

    /**
     * * opup
     * 
     * @member smgCom
     * @param {?}
     *            reqDvsnCd 청구구분
     * @param {?}
     *            acpYr 접수년도
     * @param {?}
     *            cvptAcpNo 접수번호
     * @type void
     * @author sc at 14. 11. 21 오후 3:36
     */
    openPopup : function(url , reqDvsnCd , acpYr , cvptAcpNo , dvsnCd) {

        var options = "?reqDvsnCd=" + ((reqDvsnCd == null) ? "" : reqDvsnCd) + "&acpYr=" + ((acpYr == null) ? "" : acpYr) + "&cvptAcpNo="
                + ((cvptAcpNo == null) ? "" : cvptAcpNo) + "&dvsnCd=" + ((dvsnCd == null) ? "" : dvsnCd);
        if (dvsnCd == "1") {
            window.open(url + options , "smgPopup" , "width=400, height=250, left=0,top=0, scrollbars=yes");
        } else {
            window.open(url + options , "smgPopup1" , "left=0,top=0, scrollbars=yes");
        }

    }
};

checkSsn = function(psFirst , psLast) {

    var ssn = psFirst + psLast;
    var sum = 0;
    var month = ssn.substr(2 , 2);
    var day = ssn.substr(4 , 2);

    if (ssn.length != 13) {
        return false;
    }

    // 월의 경우 13월을 넘지 않아야 한다.
    if (month < 13 && month != 0 && day != 0) {
        // 2월의 경우
        if (month == 2) {
            // 29일을 넘지 않아야 한다.
            if (day > 29)
                return false;

        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            // 4,6,9,11월의 경우 30일을 넘지 않아야 한다.
            if (day > 30)
                return false;

        } else {
            // 그외 월이 31일을 넘지 않아야 한다.
            if (day > 31)
                return false;
        }

    } else {
        return false;
    }

    for (var i = 0; i < 12; i++) {
        sum += Number(ssn.substr(i , 1)) * ((i % 8) + 2);
    }

    if (ssn.substr(6 , 1) == 1 || ssn.substr(6 , 1) == 2 || ssn.substr(6 , 1) == 3 || ssn.substr(6 , 1) == 4 || ssn.substr(6 , 1) == 9
            || ssn.substr(6 , 1) == 0) {
        // 내국인 주민번호 검증(1900(남/여) 2000(남/여))
        if (((11 - (sum % 11)) % 10) == Number(ssn.substr(12 , 1))) {
            return true;
        }

        return false;

    } else if (ssn.substr(6 , 1) == 5 || ssn.substr(6 , 1) == 6 || ssn.substr(6 , 1) == 7 || ssn.substr(6 , 1) == 8) {
        // 외국인 주민번호 검증(1900(남/여) 2000(남/여))
        if (Number(ssn.substr(8 , 1)) % 2 != 0) {
            return false;
        }

        if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(ssn.substr(12 , 1))) {
            return true;
        }
        return false;
    }

    return true; // 정상 주민번호
}

fixNumber = function(poValue) {

    if ((typeof (poValue) == "number") || poValue instanceof Number) {
        return poValue;
    }
    var vnNum = Number(this.fixNull(poValue));
    return isNaN(vnNum) ? 0 : vnNum;
}

fixNull = function(poValue) {

    var vsType = typeof (poValue);

    var vsTemp = poValue;
    if ((vsType == "string") || ((vsType == "object") && poValue instanceof String)) {
        poValue = poValue.trim();
    } else {
        if (vsType != "object") {
            if ((poValue == null) || (poValue == "null") || (poValue == "undefined")) {
                poValue = "";
            } else {
                poValue = String(poValue);
            }
        } else {
            var vsTemp = "";
            var i = 0;
            for (number in poValue) {
                vsTemp = -1;
                if (i > 0)
                    break;

                i++;
            }

            if (vsTemp == -1) {
                poValue = String(poValue);
            } else {
                poValue = "";
            }
        }
    }

    return poValue;
}

/**
 * 캡소프트 리포트 팝업 호 *
 * 
 * @param rptTitle
 * @param reportFile
 * @param reportData
 * @param dataType
 */
rptPrintPopup = function(rptTitle , reportFile , reportData , dataType) {

    try {

        dataType = (null == dataType) ? "" : dataType;

        reportData = encodeURI(reportData);

        var windowName = "RXPrintPopup";
        var arg = "width=830,height=800,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=yes,left=0,top=0";
        var wp = window.open("" , windowName , arg);

        if (null == wp) {
            alert('팝업 차단설정을 해제해주시길 바랍니다.');
        } else {
            $('#' + windowName + '_frm').remove();
            // var domain = page.metadata.domain;
            var domain = "10.22.33.226";

            var $form = $('<form></form>');
            $form.attr('method' , 'post');
            $form.attr('target' , windowName);
            $form.attr('name' , windowName + '_frm');
            $form.attr('id' , windowName + '_frm');
            $form.appendTo('body');

            if ('S' == dataType) {
                if (domain == "10.22.33.226") {
                    $form.attr('action' , '/eip/jsp/report/cdoc/eform/html_bd.jsp');
                } else if (domain == "oasys.bai.go.kr") {
                    $form.attr('action' , '/eip/jsp/report/cdoc/eform/html_bd.jsp');
                } else {
                    $form.attr('action' , '/eip/jsp/report/cdoc/eform/html_bd.jsp');
                }
            } else if ('M' == dataType) {
                if (domain == "10.22.33.226") {
                    $form.attr('action' , '/eip/jsp/report/cdoc/eform/html_typeS.jsp');
                } else if (domain == "oasys.bai.go.kr") {
                    $form.attr('action' , '/eip/jsp/report/cdoc/eform/html_typeS.jsp');
                } else {
                    $form.attr('action' , '/eip/jsp/report/cdoc/eform/html_typeS.jsp');
                }
                $form.append($('<input type="hidden" value="' + rptTitle + '" name="rptTitle" id="rptTitle">'));
                $form.append($('<input type="hidden" value="' + reportFile + '" name="reportFile" id="reportFile">'));
            } else {
                if (domain == "10.22.33.226") {
                    $form.attr('action' , '/eip/jsp/report/cdoc/eform/html.jsp');
                } else if (domain == "oasys.bai.go.kr") {
                    $form.attr('action' , '/eip/jsp/report/cdoc/eform/html.jsp');
                } else {
                    $form.attr('action' , '/eip/jsp/report/cdoc/eform/html.jsp');
                }
                $form.append($('<input type="hidden" value="' + rptTitle + '" name="rptTitle" id="rptTitle">'));
                $form.append($('<input type="hidden" value="' + reportFile + '" name="reportFile" id="reportFile">'));
                $form.append($('<input type="hidden" value="' + reportData + '" name="xmlData" id="xmlData">'));
            }

            $form.submit();
        }
    } catch (e) {
        alert('[rptPrintPopup]-' + e.description);
    }
}

var stompClient = null;
/**
 * sockJS 소켓 *
 * 
 * @param con
 * 
 * 
 */
sockJsConnect = function(config) {

    if (stompClient != null) {
        if (stompClient.ws.readyState == 0) {
            return;
        }
        sockJsDisconnect();
        stompClient = null;
    }
    console.log("sockJsConnect : 1");
    var socket = new SockJS(config.sendUrl);
    console.log("sockJsConnect : 2");
    stompClient = Stomp.over(socket);
    console.log("sockJsConnect : 3");
    stompClient.connect({} , function(frame) {

        console.log("sockJsConnect : 4");
        stompClient.subscribe('/topic/showResult' , function(data) {

            var result = JSON.parse(data.body);

            console.log("1 : " + result);
            console.log("2 : " + config);

            if ((result.usrId == config.currentUsrId) && (result.currentMenuId == config.menuId)) {
                if ((result.currentMenuId == "EI_001_002_000_000") && (result.audStepCd == config.audStepCd)) {
                    // 실지감사
                    if (config.popTy == 'POP') {
                        if (typeof window.dialogArguments != "undefined") {
                            if(config.mfexCd == "001P"){
                                doSearchTab1();
                            }else{
                                window.dialogArguments.goMenu(result.audStepCd);
                            }
                        }
                    } else {
                        if (result.audStepCd == "A1070") {
                            doReSearch();
                        } else {
                            goMenu(result.audStepCd);
                        }
                    }
                } else if (result.currentMenuId == "EI_002_001_000_000" || result.currentMenuId == "EI_002_001_001_001") {
                    // 지원부서-감사보고서-처리안검토의견
                    doAudReSearch();
                } else if ((result.currentMenuId == "EI_001_003_000_000") && (result.audStepCd == config.audStepCd)) {
                    doPushAction();
                    // 심사, 재심
                } else if (result.currentMenuId.indexOf("EI_008_") > -1 || result.currentMenuId.indexOf("EI_007_") > -1) {
                    console.log(result.audStepCd);
                    setTimeout(function() {

                        if (result.audStepCd == "D1000" || result.audStepCd == "D1001" || result.audStepCd == "D1002" || result.audStepCd == "D1003"
                                || result.audStepCd == "D1030" || result.audStepCd == "E1000" || result.audStepCd == "E1001"
                                || result.audStepCd == "E1002" || result.audStepCd == "E1003" || result.audStepCd == "E1050") {
                            docInfo();
                            doSearch();
                        } else {
                            docInfo();
                            mainTskPrcs();
                            doSearch();
                        }
                    } , 500);
                    console.log("result.currentMenuId : " + result.currentMenuId);
                    console.log("result.usrId : " + result.usrId);
                    console.log("result.audStepCd : " + result.audStepCd);
                } else if (result.currentMenuId.indexOf("EI_005_") > -1 || result.currentMenuId.indexOf("EI_006_") > -1) { // 제보청구
                    setTimeout(function() {

                        if (result.currentMenuId.indexOf("EI_006_002") > -1) {
                            docInfo();
                        } else {
                            $("#" + result.audStepCd).click();
                        }
                    } , 1000);
                    console.log("result.currentMenuId : " + result.currentMenuId);
                    console.log("result.usrId : " + result.usrId);
                    console.log("result.audStepCd : " + result.audStepCd);
                } else if (result.currentMenuId == "EI_003_001_002_001") {
                    doDtlSearch();
                } else if (result.currentMenuId == "EI_001_003_001_001") {
                    doPushAction();
                } else {
                    console.log("result.currentMenuId : " + result.currentMenuId);
                    console.log("result.usrId : " + result.usrId);
                    console.log("result.audStepCd : " + result.audStepCd);
                }
            }
        });
    });
}

/**
 * sockJS 소켓 연
 * 
 * 
 * 
 */
sockJsDisconnect = function() {

    stompClient.disconnect();
}

/**
 * 세 *
 * 
 */
logoutSession = function() {

    $.ajax({
        async : true ,
        cache : false ,
        type : "POST" ,
        url : eipCtx + "/user/login/logoutSession.do" ,
        success : function(data) {

            if (data.status == "200") {

            } else {
                alert("세션이 없습니다. 재입장 바랍니다.");
            }
        } ,
        error : function(e) {

            alert("오류 발생. 시스템 관리자에게 문의 바랍니다.");
        }
    });
}

// This function is used to get error message for all ajax calls
function getErrorMessage(jqXHR , exception) {

    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    return msg;
}

function numberCheck(event) {

    event = event || window.event;
    console.log(event.keyCode);
    var keyID = (event.which) ? event.which : event.keyCode;
    if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || (keyID == 9) || (keyID == 37) || (keyID == 39) || (keyID == 8)
            || (keyID == 46)) {
        return;
    } else {
        return false;
    }
}

btnDisable = function(id , isDisable) {

    $("#" + id).prop('disabled' , isDisable);
    if (isDisable) {
        $("#" + id).removeClass('btnBlu');
        $("#" + id).addClass('btn_disable');
    } else {
        $("#" + id).removeClass('btn_disable');
        $("#" + id).addClass('btnBlu');
    }
}