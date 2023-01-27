import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function TermCard(termData) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
	
  return (
    <Card style={{backgroundColor: "lightgreen" }} sx={{ maxWidth: 540 }}>
	
		<CardActionArea onClick={handleExpandClick}>
			<CardHeader title={termData.termData.ruTerm} subheader={termData.termData.engTerm}/>
		</CardActionArea>
      
		<Collapse in={expanded} timeout="auto" unmountOnExit>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{termData.termData.def}
				</Typography>
			</CardContent>
		</Collapse>
      
    </Card>
  );
}