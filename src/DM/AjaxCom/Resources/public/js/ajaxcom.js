// ajaxcom.js
// https://github.com/advertize/AjaxCom
(function($) {
    "use strict";
    // Intercept click and submit events and perform an ajax request then
    // handle instructions returned
    //
    // Exported as $.fn.ajaxcom
    //
    // Returns the jQuery object
    function fnAjaxcom(selector, options) {
        this.on('click', selector, function(event) {
            var opts = $.extend({}, options);
            handleClick(event, opts);
        });
        this.on('submit', selector, function(event) {
            var opts = $.extend({}, options);
            handleSubmit(event, opts);
        });
        return this;
    }

    // Does the ajax request
    //
    // Exported as $.ajaxcom
    //
    // Returns the same as $.ajax
    function ajaxcom(options) {
        var defaults = {
            dataType: 'json'
        };
        options = $.extend(true, {}, $.ajaxSettings, defaults, options);

        options.beforeSend = function(xhr, settings) {
            xhr.setRequestHeader('X-AjaxCom', 'true');
        }

        options.success = function(data, status, xhr) {
            if (data.ajaxcom) {
                $.each(data.ajaxcom, function(index, operation) {
                    handleOperation(operation);
                });
            }
        }

        return $.ajax(options);
    }

    // Handle click events
    //
    // Exported as $.ajaxcom.click
    function handleClick(event, options)
    {
        // Middle, cmd, ctrl, shift, alt clicks should open in a new tab as normal
        if (event.which>1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        var link = event.currentTarget;

        // Ignore non anchor elements
        if (link.tagName.toUpperCase()!=='A') {
            return;
        }

        // Ignore external links
        if (location.protocol!==link.protocol || location.host!==link.host) {
            return;
        }

        // Ignore anchors on the same page
        if (link.hash && link.href.replace(link.hash, '')===location.href.replace(location.hash, '')) {
            return;
        }

        // Ignore empty anchors
        if (link.href===location.href + '#') {
            return;
        }

        var defaults = {
            url: link.href
        };

        ajaxcom($.extend({}, defaults, options));

        event.preventDefault();
    }

    // Handle submit events
    //
    // Exported as $.ajaxcom.submit
    function handleSubmit(event, options)
    {
        var form = event.currentTarget;

        // Ignore nonform elements
        if (form.tagName.toUpperCase()!=='FORM') {
            return;
        }

        var defaults = {
            type: form.method,
            url: form.action,
            data: $(form).serializeArray()
        }

        ajaxcom($.extend({}, defaults, options));

        event.preventDefault();
    }

    // Delegates operations to their handler
    function handleOperation(operation) {
        switch (operation.operation) {
            case 'container':
                handleContainer(operation.options)
                break;
            case 'modal':
                handleModal(operation.options);
                break;
            case 'changeurl':
                handleChangeUrl(operation.options);
                break;
            case 'callback':
                handleCallback(operation.options);
                break;
            default:
                throw "Operation " + operation.operation + " is not supported";
                break;
        }
    }

    // Handle modals
    function handleModal(options) {
        console.warn('handleModal is not yet implement');
    }

    // Handle change urls
    function handleChangeUrl(options) {
        console.warn('handleChangeUrl is not yet implement');
    }

    // Handle callbacks
    function handleCallback(options) {
        console.warn('handleCallback is not yet implement');
    }

    // Handle containers
    function handleContainer(options) {
        switch (options.method) {
            case 'replaceWith':
                replaceWith();
                break;
            case 'append':
                append();
                break;
            case 'prepend':
                prepend();
                break;
            case 'html':
                html();
                break;
            case 'val':
                val();
                break;
            case 'remove':
                remove();
                break;
            default:
                throw "Container method " + options.method + " is not supported";
                break;
        }

        function replaceWith() {
            var $element = $(options.value);
            $element.hide();
            if (options.animate===true) {
                $(options.target).fadeOut(600, function() {
                    $(options.target).replaceWith($element);
                    $element.fadeIn(600);
                });
            } else {
                $(options.target).replaceWith($element.show());
            }
        }
        function append() {
            var $element = $(options.value);
            $element.hide();
            if (options.animate===true) {
                $(options.target).append($element);
                $element.fadeIn(600);
            } else {
                $(options.target).append($element.show());
            }
        }
        function prepend() {
            var $element = $(options.value);
            $element.hide();
            if (options.animate===true) {
                $(options.target).prepend($element);
                $element.fadeIn(600);
            } else {
                $(options.target).prepend($element.show());
            }
        }
        function html() {
            if (options.animate===true) {
                $(options.target).fadeOut(600, function() {
                    $(options.target).html(options.value);
                    $(options.target).fadeIn(600);
                });
            } else {
                $(options.target).html(options.value);
            }
        }
        function val() {
            $(options.target).val(options.value);
        }
        function remove() {
            if (options.animate===true) {
                $(options.target).fadeOut(600, function() {
                    $(options.target).remove();
                });
            } else {
                $(options.target).remove();
            }
        }
    }

    $.fn.ajaxcom = fnAjaxcom;
    $.ajaxcom = ajaxcom;
    $.ajaxcom.click = handleClick;
    $.ajaxcom.submit = handleSubmit;
})(jQuery);
