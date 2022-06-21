import styled from 'styled-components';

export const Box = styled.div`
    padding: 10px;
    background: #2C0E37;
    position: absolute;
    bottom: 0;
    width: 100%;

    @media (max-width: 1000px) {
        padding: 70px 30px;
    }
`;

export const Container = styled.div`
	// display: flex;
    display: center;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: auto;
    width: 50%;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    
`;

export const Row = styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(auto-fill,
                            minmax(185px, 1fr));
    grid-gap: 20px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill,
                                minmax(200px, 1fr));
    }
`;

export const FooterLink = styled.a`
    color: #fff;
    margin-bottom: 20px;
    font-size: 18px;
    text-decoration: none;

    &:hover {
        color: green;
        transition: 200ms ease-in;
    }
`;

export const Heading = styled.p`
    font-size: 24px;
    color: #F5F0F6;
    margin-bottom: 40px;
    font-weight: bold;

    &:hover {
        color: #FD4D02
    }
`;
