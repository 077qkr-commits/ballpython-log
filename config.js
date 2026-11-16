// ===== 배포할 때 여기만 바꾸면 돼요 =====
// 앱 안 정보 탭 → 앱 꾸미기에서도 바꿀 수 있어요 (그 폰에만 적용).
window.APP_CONFIG = {
  name: '뱀 일기',        // 브라우저 탭에 보이는 이름 (홈 화면 아이콘 이름은 manifest.json의 name·short_name)
  title: 'SNAKE DIARY',  // 홈 맨 위 큰 글자
  tag: 'DAILY LOG',      // 그 아래 작은 글자
  mark: '',              // 홈 맨 위 마크 이미지 경로 (예: 'img/mark.png'). 비우면 빈 동그라미
  petImage: '',          // 사진을 안 넣은 개체에 보여 줄 그림 경로. 비우면 이름 첫 글자·'사진 넣기' 칸
  color: '노랑'          // 대표 색: 노랑, 살구, 분홍, 라벤더, 하늘, 민트
};
