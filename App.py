from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="final"
)
cursor = db.cursor()

@app.route('/loginad', methods=['POST'])
def loginad():
    id = request.json.get('id')
    password = request.json.get('password')

    cursor.execute('SELECT * FROM admins WHERE id=%s AND password=%s', (id, password))
    staff_id = cursor.fetchone()

    if staff_id:
         return jsonify({'message': 'Login successful'})
    else:
         return jsonify({'message': 'Invalid credentials'})

@app.route('/login', methods=['POST'])
def login():
    id = request.json.get('id')
    password = request.json.get('password')

    cursor.execute('SELECT * FROM staff_profile WHERE staff_id=%s AND password=%s', (id, password))
    staff_id = cursor.fetchone()

    if staff_id:
         return jsonify({'message': 'Login successful'})
    else:
         return jsonify({'message': 'Invalid credentials'})

    
@app.route('/studlogin', methods=['POST'])
def studlogin():
    reg_no = request.json.get('reg_no')
    password = request.json.get('password')

    cursor.execute("SELECT * FROM student_profiles WHERE reg_no = %s AND password = %s", (reg_no, password))
    user = cursor.fetchone()

    if user:
        return jsonify({'message': 'Login successful', 'reg_no': reg_no})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/details/<reg_no>', methods=['GET'])
def get_user_details(reg_no):
    print(f"Received reg_no: {reg_no}")
    cursor = db.cursor(dictionary=True)
    query = "SELECT name, dob, course, section, phone_no, email, address FROM student_profiles WHERE reg_no = %s"
    cursor.execute(query, (reg_no,))
    details = cursor.fetchone()
    print(f"Result from database: {details}")

    if details:
        print(f"Details retrieved for reg_no: {reg_no}")
        return jsonify({'details': details})
    else:
        print(f"Details not found for reg_no: {reg_no}")
        return jsonify({'message': 'User not found'}), 404

    
@app.route('/marks/<reg_no>', methods=['GET'])
def get_student_marks(reg_no):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT subject, marks, test_number FROM marks WHERE reg_no = %s", (reg_no,))
    student_marks = cursor.fetchall()

    if student_marks:
        print(f"Marks retrieved for reg_no: {reg_no}")
        return jsonify({'marks': student_marks})
    else:
        print(f"Marks not found for reg_no: {reg_no}")
        return jsonify({'message': 'Marks not found'}), 404

@app.route('/staffprofile', methods=['POST'])
def staffprofile():
    data = request.json
    staff_id = data['staff_id']
    username = data['username']
    password = data['password']

    if not all([staff_id, username, password]):
        return jsonify({"message": "All fields are required"}), 400

    # Insert data into MySQL
    cursor.execute("INSERT INTO staff_profile (staff_id, username, password) VALUES (%s, %s, %s)",
                   (staff_id, username, password))
    db.commit()

    return jsonify({"message": "Registration successful"}), 200

@app.route('/profile', methods=['POST'])
def register():
    data = request.json
    reg_no = data['reg_no']
    name = data['name']
    dob = data['dob']
    course = data['course']
    section = data['section']
    phone_no = data['phone_no']
    email = data['email']
    address = data['address']
    password = data['password']

    if not all([reg_no, name, dob, course, section, phone_no, email, address, password]):
        return jsonify({"message": "All fields are required"}), 400

    # Insert data into MySQL
    cursor.execute("INSERT INTO student_profiles (reg_no, name, dob, course, section, phone_no, email, address, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                   (reg_no, name, dob, course, section, phone_no, email, address, password))
    db.commit()

    return jsonify({"message": "Registration successful"}), 200

@app.route('/get_registration_numbers', methods=['GET'])
def get_registration_numbers():
    cursor.execute("SELECT reg_no FROM student_profiles")
    reg_numbers = [row[0] for row in cursor.fetchall()]
    return jsonify(reg_numbers)

@app.route('/enter_marks', methods=['POST'])
def enter_marks():
    mark_data = request.json

    for data in mark_data:
        reg_no = data['reg_no']
        semester = data['semester']
        subject = data['subject']
        testNumber = data['test_number']
        marks = data['marks']

        cursor.execute("INSERT INTO marks (reg_no, subject, test_number, marks, semester) VALUES (%s, %s, %s, %s, %s)",
                       (reg_no, subject, testNumber, marks, semester))
        db.commit()

    return jsonify({"message": "Marks entered successfully"}), 200

@app.route('/enter_attendance', methods=['POST'])
def enter_attendance():
    attendance_data = request.json

    for data in attendance_data:
        reg_no = data['reg_no']
        date = data['date']
        period = data['period']
        subject = data['subject']
        attendance = data['attendance']

        # Insert data into MySQL
        cursor.execute("INSERT INTO attendance (reg_no, date, period, subject, attendance) VALUES (%s, %s, %s, %s, %s)",
                       (reg_no, date, period, subject, attendance))
        db.commit()

    return jsonify({"message": "Attendance entered successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
