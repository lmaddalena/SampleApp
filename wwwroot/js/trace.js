$(function () {
    Trace.init();
});


var Trace = {

    traceServiceUrl : 'http://localhost:5001/',
    sent : 0,
    completed : 0,
    errors : 0,
    success : 0,
    massivemax : 1000,

    init : function() {

        $(window).bind('beforeunload', function(e) {
            return "abbandonare!!";
        });

        // ajax setup
        jQuery.ajaxSetup({
            timeout: 20000,
            cache: false
        });

        //events handlers
        $("#btn-single").click(this.single);
        $("#btn-massive").click(this.massive);
    },

    single : function () {
      
        
        $("#btn-single").addClass('loading');
        $("#btn-single").attr('disabled', 'disabled');
        $("#btn-massive").attr('disabled', 'disabled');

        Trace.set_sent(0);
        Trace.set_completed(0);
        Trace.set_errors(0);
        Trace.set_success(0);

        Trace.writeTrace(
            'single', 
            'Single Trace Test', 
            null, 
            0,
            function(){
                if(1 == Trace.completed)
                {
                    $("#btn-single").removeClass('loading');
                    $("#btn-single").removeAttr('disabled');
                    $("#btn-massive").removeAttr('disabled');                   
                }
            
            });


    },

    massive : function () {
        $("#btn-massive").addClass('loading');
        $("#btn-massive").attr('disabled', 'disabled');
        $("#btn-single").attr('disabled', 'disabled');

        Trace.set_sent(0);
        Trace.set_completed(0);
        Trace.set_errors(0);
        Trace.set_success(0);

        for(i = 0; i < Trace.massivemax; i++){
            Trace.writeTrace(
                'massive', 
                'Massive Trace Test', 
                null, 
                0, 
                function(){
                    if(Trace.massivemax == Trace.completed)
                    {
                        $("#btn-massive").removeClass('loading');
                        $("#btn-massive").removeAttr('disabled');       
                        $("#btn-single").removeAttr('disabled');
              
                    }
                });           
        }


    },

    set_sent : function(val){
        Trace.sent = val;
        $('#lbl-sent').text(val);
    },

    set_success : function(val){
        Trace.success = val;
        $('#lbl-success').text(val);
    },

    set_errors : function(val){
        Trace.errors = val;
        $('#lbl-errors').text(val);
    },

    set_completed : function(val){
        Trace.completed = val;
        $('#lbl-completed').text(val);
    },

    writeTrace : function (operation, description, correlationId, level, callback) {

        Trace.set_sent(++Trace.sent);

        var data = {
            TraceDate: new Date(),
            Origin: 'SampleApp',
            Module: 'TraceTest',
            Operation: operation,
            Description: description,
            Object: null,
            ObjectId: null,
            Details: null,
            CorrelationId: correlationId,
            Level: level
        };

        jQuery.ajax({
            type: 'POST',
            crossDomain: true,
            contentType: 'application/json; charset=utf-8',
            url: Trace.traceServiceUrl + 'api/traces',
            data: JSON.stringify(data),
            dataType: 'json',

            success: function (data, status, jqXHR) {
                Trace.set_success(++Trace.success);
            },

            error: function (jqXHR, status, error) {
                Trace.set_errors(++Trace.errors);
            },

            complete: function (jqXHR, status) {
                Trace.set_completed(++Trace.completed);
                if(callback != undefined)
                    callback();
            }


        });

    },
    
}
