import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_recommendations(course_data, completed_ids, top_n=3):
    df = pd.DataFrame(course_data)
    if df.empty or not completed_ids:
        return []

    # 🧠 Filter to only categories user has engaged with
    completed_categories = df[df["id"].isin(completed_ids)]["category"].unique()
    df = df[df["category"].isin(completed_categories)]

    if df.empty:
        return []

    # 🧠 Generate tag using title + category
    df["tags"] = df["title"] + " " + df["category"]

    # 🔍 TF-IDF vectorization
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(df["tags"])

    # 👤 Build user profile vector from completed courses
    completed_df = df[df["id"].isin(completed_ids)]
    user_tags = " ".join(completed_df["tags"])
    user_vector = vectorizer.transform([user_tags])

    # 📈 Similarity calculation
    similarity_scores = cosine_similarity(user_vector, tfidf_matrix).flatten()

    # ❌ Exclude already completed courses
    for idx, row in df.iterrows():
        if row["id"] in completed_ids:
            similarity_scores[idx] = -1

    # 🏆 Pick top N courses
    top_indices = similarity_scores.argsort()[::-1][:top_n]
    recommended = df.iloc[top_indices][["id", "title", "image", "description", "category"]].to_dict(orient="records")
    return recommended
