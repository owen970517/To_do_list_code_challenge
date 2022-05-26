# To_do_list code challenge

- React 와 Typescript를 이용하여 To_do_list를 만들었습니다.
- react-beautiful-dnd 라이브러리를 사용하여 Drag & Drop을 쉽게 구현하였습니다.
- react-beautiful-dnd 는 아직 React 18버전이 나오지 않았기 때문에 npm 할 때 --legacy-peer-deps를 사용하였습니다.
- useForm hook을 사용하여 간단하게 유효성 검사를 구현하였습니다.
- styled-components 를 사용하여 css를 만들었습니다.
- recoil을 사용하여 상태 관리를 쉽게 하였습니다.

# 제가 추가로 만든 기능 
- 원하는 list board를 언제든지 만들 수 있도록 input 창을 만들었습니다. 또한 같은 이름의 board는 만들 수 없도록 유효성 검사를 추가했습니다. 
- 추가 한 board와 toDo를 삭제 할 수 있도록 삭제 버튼을 만들었습니다.
- recoilPersist 라이브러리를 사용하여 localstorage를 만들어 페이지가 새로고침 되더라도 상태를 유지할 수 있도록 만들었습니다.
