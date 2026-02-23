/**
 * Flama depende de jQuery
 * 
 * @author Diego Rodriguez <diego.rodriguez.gomez@gmail.com>
 */
$(function(){

    window.flama = {
        loader:null,
        /**
         * Muestra o oculta un loader spinner global
         * 
         * @param {string|false} message Mensaje opcional del loader. si es false se elimina
         * 
         * @returns {void}
         */
        loading:function(
            message
        ){
            if(this.loader == null){
                this.loader = $('<fl-loader></fl-loader>').appendTo('body');
            }
            if(message === false){
                this.loader.visible(false);
            } else {
                message = message ? message : '';
                if(message == ''){
                    this.loader.unset('message').visible();
                } else {
                    this.loader.set('message', message).visible();
                }
            }
        },
        /**
         * Muestra un mensaje modal
         * 
         * @param {object}         options 
         * @param {boolean|string} options.icon    Nombre del icono a usar, uno de /flama/img/{options.icon}.png
         * @param {boolean|string} options.title   Titulo de la ventana
         * @param {boolean|string} options.message Mensaje principal
         * @param {array}          options.actions Lista de botones
         * @param {string}              options.actions.text    Texto del boton
         * @param {string}              options.actions.type    Tipo del boton, '' | outline | disabled
         * @param {string}              options.actions.event   Nombre del evento que causa el boton sobre la ventana de mensaje
         * @param {boolean}             options.actions.closes  Si True el botón cierra la ventana
         * @param {function}            options.actions.onPress Delegado de click sobre el boton (index, action) => {}
         * 
         * @event close Cuando se cierra la ventana
         * 
         * @returns {jQuery element}
         */
        message:function(
            options
        ){
            var settings = $.extend({}, {
                icon:false,
                title:false,
                message:false,
                actions:[]
            }, options);
            settings.actions = settings.actions.map(function(action){
                /**
                 * text: Texto de la accion,
                 * type: ''* | outline | disabled
                 * closes: boolean
                 * event: '' | nombre del evento
                 * onPress: (index, action) => {}
                 */
                return $.extend({}, {
                    text:false,
                    type:'',
                    closes:false,
                    event:false,
                    onPress:(index, action) => {}
                }, action)
            });
            var modal = $(`
                <fl-modal>
                    <fl-card message>
                        ` + (settings.icon ? `<img src="/img/${settings.icon}.png" />` : '') + `
                        <fl-card-body>
                            ` + (settings.title ? `<fl-card-title>${settings.title}</fl-card-title>` : '') + `
                            ` + (settings.message ? `<fl-card-message>${settings.message}</fl-card-message>` : '') + `
                        </fl-card-body>
                        <fl-buttons class="modal-actions" center></fl-button>
                    </fl-card>
                </fl-modal>
            `);
            modal.find('.modal-actions').append(
                settings.actions.map((action, index) => {
                    return $(`<fl-button small ${action.type}>${action.text}</fl-button>`).on('click', function(e){
                        e.preventDefault();
                        action.onPress(index, action);
                        if(action.closes){
                            modal.visible(false);
                            modal.trigger('close', [index, action]);
                        }
                        if(action.event){
                            modal.trigger(action.event, [index, action]);
                        }
                    })
                })
            );
            return modal.appendTo('body').visible();
        },
        /**
         * Muestra un mensaje modal de alerta
         * 
         * @see   window.flama.message
         * 
         * @param {string|object} options Objeto de configuración o mensaje principal de la alerta
         * 
         * @event accept Cuando se cierra la ventana
         * 
         * @returns {jQuery element}
         */
        alert:function(
            options
        ){
            if(typeof options == 'string'){
                options = {
                    title:'Mensaje del sistema',
                    message:options
                };
            }
            return this.message($.extend({}, {
                title:false,
                icon:false,
                message:false,
                actions:[
                    {
                        text:'Aceptar',
                        event:'accept',
                        closes:true
                    }
                ]
            }, options));
        },
        /**
         * Muestra un mensaje modal de confirmacion
         * 
         * @see   window.flama.message
         * 
         * @param {string|object} options Objeto de configuración o mensaje principal de la confirmación
         * 
         * @event accept Cuando se acepta la ventana
         * @event cancel Cuando se cancela la ventana
         * 
         * @returns {jQuery element}
         */
        confirm:function(
            options
        ){
            if(typeof options == 'string'){
                options = {
                    title:'Confirmación',
                    message:options
                };
            }
            return this.message($.extend({}, {
                title:false,
                icon:false,
                message:false,
                actions:[
                    {
                        text:'Cancelar',
                        type:'outline',
                        event:'cancel',
                        closes:true
                    },
                    {
                        text:'Aceptar',
                        event:'accept',
                        closes:true
                    }
                ]
            }, options));
        },
        /**
         * Inicia configuraciones básicas opcionales
         * 
         * @return {void}
         */
        init:function(){
            $('html').flama();
        }
    };

    /**
     * Muestra o oculta un elemento que soporte la propiedad visible.
     * 
     * @param {bool} visible Define si el atributo es visible o se elimina, por defecto true
     * 
     * @returns {jQuery element}
     */
    $.fn.visible = function (
        visible
    ){
        return $(this).enableProperty('visible', visible);
    };

    /**
     * Habilita o deshabilita una propiedad.
     * Solo util para propiedades sin value
     * 
     * @param {string} propertyName 
     * @param {bool}   propertyEnabled 
     * @returns 
     */
    $.fn.enableProperty = function(
        propertyName,
        propertyEnabled
    ){
        return (
            (propertyEnabled || propertyEnabled === undefined) 
            ? $(this).set(propertyName) 
            : $(this).unset(propertyName)
        );
    }

    /**
     * Elimina un atributo
     * 
     * @param {string} attr Atributo a eliminar
     * 
     * @returns {jQuery element}
     */
    $.fn.unset = function (
        attr
    ){
        return $(this).removeAttr(attr);
    };

    /**
     * Setea un atributo
     * 
     * @param {string} attr  Atributo a setear
     * @param {*}      value Valor para setear, si no se define se usa el mismo attr 
     * 
     * @returns {jQuery element}
     */
    $.fn.set = function (
        attr,
        value
    ){
        return $(this).attr(attr, value === undefined ? attr : value);
    };

    /**
     * Setea eventos para un selector prototipo
     * 
     * @returns {jQuery element}
     */
    $.fn.selector = function (){
        var selector = $(this);
        if(!selector.data('flama-selector-events')){
            selector.data('flama-selector-events', true).on('update', function(){
                $(this).siblings('fl-select').text($(this).find('option:selected').text());
            }).on('change', function(){
                $(this).trigger('update');
            }).trigger('update');
        }
        return selector;
    };

    /**
     * Ejecuta configuraciones iniciales opcionales
     * 
     * @returns {jQuery element}
     */
    $.fn.flama = function (){
        var element = $(this);
        element.find('fl-input > select').selector();
        return element;
    };

    // Iniciar flama
    window.flama.init();

})