$(document).ready(() => {
    $(".event_form").submit((e) => {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/event",
            data: new FormData(e.target),
            processData: false,
            contentType: false,
            beforeSend: () => {
                $(".event_form").css({
                    pinterEvents: 'none',
                    cursor: 'not-allowed'
                });
                $(".event-btn").addClass('d-none');
                $('.event-process-btn').removeClass('d-none');
            },
            success: (response) => {
                if (response.status) {
                    window.location.reload();
                }
            },
            error: (xhr) => {
                console.log('err', response)
            }
        });
    });
});
