
//jQuery
<script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script>
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<script src="http://thecodeplayer.com/uploads/js/jquery-1.9.1.min.js" type="text/javascript"></script>

//jQuery Easing script
<script src="http://thecodeplayer.com/uploads/js/jquery.easing.min.js" type="text/javascript"></script>

//jQuery Form Script (WP syntax)
<script type='text/javascript'>
        jQuery(document).ready(function(){

           // Disabling the enter-button to prevent premature sending
            jQuery('.msform').on('keyup keypress', function (e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 13) {
                    e.preventDefault();
                    return false;
                }
            });

            var current_fs, next_fs, previous_fs; // Fieldsets
            var left, opacity, scale; // Fieldset styling
            var animating; // Prevent multi-click glitching

            jQuery(".next").click(function () { 
                if (animating) return false;

                // Check if the inputs with class 'required' has value
                if (jQuery('.req-check .required').val() == ''){
                    alert('There is an empty field.');
                    return false;
                }
                
                animating = true; 
            
                current_fs = jQuery(this).parent().parent();
                next_fs = jQuery(this).parent().parent().next();

                // Pass on the requirement check to next fieldset
                jQuery("fieldset").eq(jQuery("fieldset").index(next_fs)).addClass("req-check");
                jQuery("fieldset").eq(jQuery("fieldset").index(current_fs)).removeClass("req-check");

                // Add next step on progressbar
                jQuery(".progressbar-form li").eq(jQuery("fieldset").index(next_fs)).addClass("active");

                next_fs.show();

                current_fs.animate({opacity: 0 }, {
                    step: function (now, mx) {
                        //1. Scale current_fs to 80%
                        scale = 1 - (1 - now) * 0.2;
                        //2. Let next_fs come in from right (50%)
                        left = (now * 50) + "%";
                        //3. Set opacity of next_fs to 1 when entering.
                        opacity = 1 - now;
                        current_fs.css({'transform': 'scale(' + scale + ')' });
                        next_fs.css({'left': left, 'opacity': opacity });
                    },
                    duration: 800, 
                    complete: function () {
                        current_fs.hide();
                        animating = false; 
                    },
                    easing: 'easeInOutBack'
                });       
            });
    

            jQuery(".previous").click(function () {
                if (animating) return false;
                animating = true;

                current_fs = $(this).parent().parent();
                previous_fs = $(this).parent().parent().prev();

                // Pass the requirement check back
                jQuery("fieldset").eq(jQuery("fieldset").index(previous_fs)).addClass("req-check");
                jQuery("fieldset").eq(jQuery("fieldset").index(current_fs)).removeClass("req-check");

                // Remove step from progressbar
                jQuery(".progressbar-form li").eq(jQuery("fieldset").index(current_fs)).removeClass("active");

                previous_fs.show();
                current_fs.animate({opacity: 0 }, {
                    step: function (now, mx) {    
                        scale = 0.8 + (1 - now) * 0.2;
                        left = ((1 - now) * 50) + "%";
                        opacity = 1 - now;
                        current_fs.css({'left': left });
                        previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity });
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    easing: 'easeInOutBack'
                });
            });
});
</script>