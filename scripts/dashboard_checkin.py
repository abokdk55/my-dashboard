"""
관세뉴스 -> 네이버 블로그 자동 게시 스크립트에서 가져다 쓰는 헬퍼.
글 발행에 성공한 직후 report_publish(...)를 호출하면 대시보드에 자동 반영됨.

필요한 환경변수:
  DASHBOARD_BASE_URL   예: https://my-dashboard.vercel.app
  DASHBOARD_API_KEY    .env.local의 AUTOMATION_API_KEY와 동일한 값
"""

import os
import requests

PROJECT_NAME = "관세뉴스 → 블로그 자동 게시"


def report_publish(title: str, url: str, progress: int | None = None, next_action: str | None = None) -> None:
    base_url = os.environ["DASHBOARD_BASE_URL"].rstrip("/")
    api_key = os.environ["DASHBOARD_API_KEY"]

    payload = {"project": PROJECT_NAME, "title": title, "url": url}
    if progress is not None:
        payload["progress"] = progress
    if next_action is not None:
        payload["next_action"] = next_action

    resp = requests.post(
        f"{base_url}/api/automation/check-in",
        json=payload,
        headers={"Authorization": f"Bearer {api_key}"},
        timeout=10,
    )
    if not resp.ok:
        print(f"[dashboard-checkin] 실패 ({resp.status_code}): {resp.text}")
    resp.raise_for_status()


if __name__ == "__main__":
    # 사용 예시 — 실제 발행 로직 뒤에 이렇게 붙이면 됨
    report_publish(
        title="OO 관세 인상 관련 뉴스 요약",
        url="https://blog.naver.com/abokdk/223000000000",
        progress=15,
        next_action="다음 뉴스 주제 자동 선정 로직 다듬기",
    )
