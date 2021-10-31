import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    case: {
        border: '1mm ridge rgba(0, 0, 0, .6);',
        padding: '15px'
    },
    maxHp: {
        fontSize: 'medium',
    },
    currentHp: {
        fontSize: 'xx-large',
    }
}));

function CharacterHP(props) {

    const classes = useStyles();

    return (
        <>
            <div className={classNames(classes.case)}>
                <div>
                    <text>Max: </text>
                    <text className={classNames(classes.maxHp)}>{props.maxHp}</text>
                </div>
                <div>
                    <text>Current: </text>
                    <text className={classNames(classes.currentHp)}>{props.currentHp}</text>
                </div>
            </div>
        </>
    )
}

export default CharacterHP;