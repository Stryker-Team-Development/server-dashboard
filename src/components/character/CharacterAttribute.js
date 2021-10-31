import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
    characterAttribute: {
        border: '1mm ridge rgba(0, 0, 0, .6);',
    },
    complementaryText: {
        margin: '0px',
        textAlign: 'center',
        fontSize: 'small'
    },
    attributeModifier: {
        margin: '5px',
        textAlign: 'center',
        fontSize: 'xx-large',
        border: '1mm ridge rgba(0, 0, 0, .6);'
    }
}));

function CharacterAttribute(props) {

    const classes = useStyles();

    return (
        <>
            <div className={classNames(classes.characterAttribute)}>
                <p className={classNames(classes.complementaryText)}>{props.name}</p>
                <p className={classNames(classes.attributeModifier)}>+{props.modifier}</p>
                <p className={classNames(classes.complementaryText)}>{props.value}</p>
            </div>
        </>
    )
}

export default CharacterAttribute;