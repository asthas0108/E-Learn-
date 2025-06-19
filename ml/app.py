from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from recommender import get_recommendations
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Course(BaseModel):
    id: str
    title: str
    description: str
    category: str
    image: str

class RecommendationRequest(BaseModel):
    courses: List[Course]
    completedCourseIds: List[str]

@app.post("/recommend")
async def recommend(data: RecommendationRequest):
    try:
        # ✅ Include all courses for recommendation
        all_course_dicts = [course.dict() for course in data.courses]

        # 🔍 Generate recommendations using all courses + completed IDs
        raw_recommendations = get_recommendations(all_course_dicts, data.completedCourseIds)

        # ❌ Remove any recommendations already completed
        completed_set = set(data.completedCourseIds)
        final_recommendations = [c for c in raw_recommendations if c["id"] not in completed_set]

        return {"recommendedCourses": final_recommendations}
    except Exception as e:
        print("ERROR:", str(e))
        return {"error": str(e)}
