// tip -box
    window.TipBox = (function () {
        var tipMask = document.querySelector('#tipMask');
        var confirmFn, cancelFn;
        document.querySelector('#tipMask .icon-cancel')
            .addEventListener('click', function (e) {
                tipMask.classList.remove('active');
                if (cancelFn) {
                    cancelFn(e);
                    cancelFn = null;
                }
            });

        document.querySelector('#tipMask .btn-cancel')
            .addEventListener('click', function (e) {
                tipMask.classList.remove('active');
                if (cancelFn) {
                    cancelFn(e);
                    cancelFn = null;
                }
            });

        document.querySelector('#tipMask .btn-confirm')
            .addEventListener('click', function (e) {
                tipMask.classList.remove('active');
                if (confirmFn) {
                    confirmFn(e);
                    confirmFn = null;
                }
            });
        return {
            alertConfirm: function (message, comfirmCb, cancelCb) {
                tipMask.setAttribute('data-type', 'confirm');
                tipMask.querySelector('.tip-message').innerHTML = message;
                tipMask.classList.add('active');
                confirmFn = comfirmCb;
                cancelFn = cancelCb;
            },
            alertMessage: function (message, comfirmCb, cancelCb) {
                tipMask.setAttribute('data-type', 'message');
                tipMask.querySelector('.tip-message').innerHTML = message;
                tipMask.classList.add('active');
                confirmFn = comfirmCb;
                cancelFn = cancelCb;
            }
        }
    })();