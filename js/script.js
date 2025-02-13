document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabGroup = button.closest('.tabs');
        const tabId = button.dataset.tab;

        // Xóa lớp active cho tất cả các nút và nội dung
        tabGroup.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        tabGroup.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Kích hoạt tab được chọn
        button.classList.add('active');
        tabGroup.querySelector(`#${tabId}`).classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const ratingStars = document.querySelectorAll('.rating span');
    let selectedRating = 0;

    // Sự kiện chọn sao
    ratingStars.forEach((star) => {
        star.addEventListener('click', () => {
            selectedRating = star.getAttribute('data-value');
            // Cập nhật trạng thái sao
            ratingStars.forEach((s) => {
                s.classList.remove('active');
            });
            for (let i = 0; i < selectedRating; i++) {
                ratingStars[i].classList.add('active');
            }
        });
    });

    // Xử lý gửi form
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById("notificationBox").style.display = "block";
    });

    document.getElementById("closeBtn").addEventListener("click", function () {
        location.reload(); // Load lại trang
      });
});
