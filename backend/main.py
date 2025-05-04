from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],   # Nuxt dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/hello")
async def hello(name: str = None):
    logger.info(f"Received request with name: {name}")
    if name:
        return {"message": f"FastAPI says hello to {name} 👋"}
    else:
        return {"message": "FastAPI says hello 👋"}
    
@app.get("/agents")
async def get_agents():
    agents = [
        {"id": 1, "name": "Agent 1"},
        {"id": 2, "name": "Agent 2"},
        {"id": 3, "name": "Agent 3"},
    ]
    logger.info("Returning list of agents")
    return agents

@app.get("/agents/{agent_id}")
async def get_agent(agent_id: int):
    agents = [
        {"id": 1, "name": "Agent 1"},
        {"id": 2, "name": "Agent 2"},
        {"id": 3, "name": "Agent 3"},
    ]
    agent = next((agent for agent in agents if agent["id"] == agent_id), None)
    if agent:
        logger.info(f"Returning details for agent {agent_id}")
        return agent
    else:
        logger.warning(f"Agent {agent_id} not found")
        return {"error": "Agent not found"}