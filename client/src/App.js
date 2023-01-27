import React, { useEffect, useState } from "react";
import ButtonAppBar from './appbar';
import TermCard from './Сard';
import Grid from '@mui/material/Grid'; 
import { Routes, Route } from "react-router-dom";
import ForceGraph2D from 'react-force-graph-2d';

function App() {
  return (
    <div>
      <Routes>
          <Route index element={<Home />} />
          <Route path="mindmap" element={<Mindmap />} />
      </Routes>
    </div>
  );
}

function Home() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:9090/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div>
	<ButtonAppBar />
      {typeof backendData.terms === "undefined" ? (<p>Loading...</p>) : 
      (
        <div>
              <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  paddingTop="4em"
                  paddingLeft="4em"
              >
                  {backendData.terms.map((term, i) => (
                      <Grid item xs={6} key={i}>
                          <TermCard  key={i} termData={term} />
                      </Grid>
                  ))}
              </Grid>
      </div>)
	    }
    </div>
  );
}

function Mindmap() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:9090/api2")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);
  
  return (
    <div>
		<ButtonAppBar />
		
			{typeof backendData.nodes === "undefined" ? (<p>Loading...</p>) : 
			(
				<div>
					<ForceGraph2D
						width = {2000}
						height = {1000}
						graphData={backendData}
            dagLevelDistance={100}
            linkDistance={60} 
            nodeLabel={node => node.id}
            nodeLabelStyle={{ fontSize: '12px', fontWeight: 'bold', fill: 'white' }}
						
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              ctx.font = `${10 / globalScale}px Arial`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, 10 / globalScale].map(n => n + (10 / globalScale) * 0.5); 
              ctx.fillStyle = 'white';
              ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
              ctx.textAlign = 'center';
              ctx.fillStyle = 'black';
              ctx.fillText(label, node.x, node.y + 4); 
            }}
					/>
				</div>
			)}

    </div>
  );
  
	
  
}

export default App;
