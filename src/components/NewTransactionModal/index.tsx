import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
import { api } from '../../services/api';
import { Container, TransactionTypeContainer,RadioBox } from './styles';
import { FormEvent, useState, useContext } from 'react';
import { TransactionsContext } from '../../TransactionsContext';




Modal.setAppElement('#root')

interface NewTransactionModalProps {
    isOpen: boolean
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const {createTransaction} = useContext(TransactionsContext)

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(NaN);
    const [category, SetCategory] = useState('');
    const [type, setType] = useState('deposit');

    function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        createTransaction({
            title,
            amount,
            category,
            type,
        })
        
    }
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar nova transação" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transações</h2>

                <input
                    placeholder='Título'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    type="number"
                    placeholder='Valor'
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={()=>{setType('deposit')}}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={()=>{setType('withdraw')}}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder='Categoria'
                    value={category}
                    onChange={event => SetCategory(event.target.value)}
                />

                <button type="submit" >Cadastrar</button>

            </Container>
        </Modal>
    )
}