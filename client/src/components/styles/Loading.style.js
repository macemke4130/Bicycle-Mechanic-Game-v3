import styled from 'styled-components';

export const LoadingSpinner = styled.img`
    width: 50%;
    animation: spin 10s linear infinite;

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;