import Card from '@material-ui/core/Card';
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
      margin: 'auto',
      maxWidth: 720,
      height: 405,
      zIndex: 1,
      marginTop: 60,
      marginBottom: 60,
      border: '1px solid #d4d4d4',
      borderRadius: 0,
      webkitBoxShadow: '0 2px 4px 1px rgba(0,0,0,0.15);',
      mozBoxShadow: '0 2px 4px 1px rgba(0,0,0,0.15);',
      boxShadow: '0 2px 4px 1px rgba(0,0,0,0.15);'
    }
  }));
  

export default function YoutubeCard() {

    const classes = useStyles();

    let index = Math.floor(Math.random() * 12);

    return (
        <Card className={classNames(classes.card)}>
            <div>
                <iframe width="720" height="405" src={"https://www.youtube.com/embed/?listType=playlist&list=PLDiFgzzSZgFjVQgvBsNTuM8WoSh9WT9Sx&index="+index} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            </div>
        </Card>
    );
}
