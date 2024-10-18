from attendance.models import Department, Employee
import random
from django.utils import timezone

# Create 9 departments
departments = [
    "営業部", "開発部", "人事部", "財務部", "マーケティング部",
    "カスタマーサポート部", "法務部", "総務部", "研究開発部"
]

for dept_name in departments:
    Department.objects.create(name=dept_name)

# Create 200 employees
first_names = ["太郎", "花子", "一郎", "美智子", "健太", "さくら", "翔太", "愛", "大輔", "麻衣"]
last_names = ["佐藤", "鈴木", "高橋", "田中", "渡辺", "伊藤", "山本", "中村", "小林", "加藤"]

statuses = ["出勤", "退勤", "外出"]

for _ in range(200):
    name = f"{random.choice(last_names)} {random.choice(first_names)}"
    department = Department.objects.order_by('?').first()
    status = random.choice(statuses)
    clock_in_time = timezone.now() if status != "退勤" else None
    
    Employee.objects.create(
        name=name,
        department=department,
        status=status,
        clock_in_time=clock_in_time
    )

print("Database populated with 9 departments and 200 employees.")