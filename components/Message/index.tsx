import { MdClose } from "react-icons/md";
import styled from "styled-components";
import { useGlobalContext } from "../../Context";

const ToastContainer = styled.div<{ bg: string; visible: boolean }>`
  background-color: ${({ bg }) => bg};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  padding: 0.4rem 0.6rem;
  color: var(--fg);
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 10;
  max-width: 25vw;
  h3 {
    font-size: 1rem;

    display: flex;
    justify-content: space-between;
  }
  p {
    font-size: 0.8rem;
  }
`;

const MessageToast: React.FC = () => {
  const { data, actions } = useGlobalContext((state) => state);
  const { visible, text, title, color } = data.message;

  const closeMessage = () => {
    actions.setMessageVisibility(false);
  };

  return (
    <ToastContainer visible={visible} bg={color}>
      {title && (
        <h3>
          {title} <MdClose onClick={closeMessage} />
        </h3>
      )}
      {text && <p>{text}</p>}
    </ToastContainer>
  );
};

export default MessageToast;
