from django.http import JsonResponse
from django.shortcuts import render, redirect
import requests


CLIENT_ID = 'b625492a559bfc799210f29b18f197a9'
REDIRECT_URI = 'http://localhost:8000/api/kakao/login/callback/'
def kakao_login(request):
    kakao_auth_api = 'https://kauth.kakao.com/oauth/authorize?response_type=code'

    return redirect(
        f'{kakao_auth_api}&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}'
    )

def kakao_callback(request):
    # --- 인가코드 받아오기 --- #
    code = request.GET.get('code')

    # --- 토큰 받아오기 --- #
    token_request = requests.post(
        f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&code={code}"
    )
    token_json = token_request.json()
    access_token = token_json.get("access_token")

    # --- 사용자 정보 받아오기 --- #
    profile_request = requests.post("https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"})
    profile_json = profile_request.json()
    print(profile_json)

    return JsonResponse({"property" : profile_json})
    # return JsonResponse({"profile" : profile_json})


def kakao_delete(request):
    kakao_auth_url = f'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}'
    res = requests.get(kakao_auth_url)
    print(res.text)

    # # --- 인가코드 받아오기 --- #
    # code = request.GET.get('code')
    #
    # # --- 토큰 받아오기 --- #
    # token_request = requests.post(
    #     f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&code={code}"
    # )
    # token_json = token_request.json()
    # access_token = token_json.get("access_token")
    #
    # # --- 사용자 정보 받아오기 --- #
    # profile_request = requests.post("https://kapi.kakao.com/v2/user/me", headers={"Authorization": f"Bearer {access_token}"})
    # profile_json = profile_request.json()
    # print(type(profile_json), profile_json)
    #
    #
    # params = {
    #     'target_id_type': 'user_id',
    #     'target_id': profile_json['id']
    # }
    # res = requests.post("https://kapi.kakao.com/v1/user/unlink", headers={"Authorization": f"Bearer {access_token}"}, data=params)
    # print(res.json())

    return JsonResponse({"property" : 'hello'})
    # return JsonResponse({"profile" : profile_json})