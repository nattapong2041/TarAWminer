from flask import Flask, render_template, request,jsonify, url_for, redirect, session
import pymongo
from pymongo import MongoClient
import bcrypt

client = MongoClient('mongodb://localhost:27017/dbtests')
db = client.dbtests


app = Flask(__name__)
app.secret_key = "super secret key"

@app.route("/register", methods=["POST", "GET"])

def register():
    if request.method == "POST":
        nickname = request.form.get("name")
        user = request.form.get("username")
        email = request.form.get("email")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        #if found in database showcase that it's found 
        user_found = db.test.find_one({"name": user})
        email_found = db.test.find_one({"email": email})
        if user_found:
            message = 'There already is a user by that name'
            return jsonify({"error":message})
            #return render_template('index.html', message=message)
        if email_found:
            message = 'This email already exists in database'
            return jsonify({"error":message})
        if password1 != password2:
            message = 'Passwords should match!'
            return jsonify({"error":message})
        else:
            #hash the password and encode it
            ###hashed = bcrypt.hashpw(password2.encode('utf-8'), bcrypt.gensalt())
            #assing them in a dictionary in key value pairs
            ###user_input = {'name': user, 'email': email, 'password': hashed}
            #insert it in the record collection
            db.test.insert_one(
            {
                'name':nickname,
                'username': user,
                'password': password2,
                'email': email
            })
            
            
            #find the new created account and its email
            user_data = db.tests.find_one({"email": email})
            new_user = user_data['email']
            #if registered redirect to logged in as the registered user
            return jsonify({"error":"testestest"})
            #return render_template('logged_in.html', username=new_user)
    return render_template('index.html')

@app.route('/logged_in')

def logged_in():
    if "username" in session:
        username = session["username"]
        return render_template('logged_in.html', username=username)
    else:
        return jsonify({"1111":"1111"})
        #return render_template('login.html')
        #return redirect(url_for("login"))

@app.route("/login", methods=["POST", "GET"])

def login():
    message = 'Please login to your account'
    #ถ้ามีsession ยุแล้วจะกลับไปหน้าล็อคอินแล้ว
    if "username" in session:

        return jsonify({"123":"123"})
        #return redirect(url_for("logged_in"))
    #กดล็อคอินมา
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

    #check if user exists in database
        user_found = db.test.find_one({"username": username})
        if user_found:
            user_val = user_found['username']
            passwordcheck = user_found['password']
            
            if passwordcheck == password :
            #if bcrypt.checkpw(password.encode('utf-8'), passwordcheck):
                session["username"] = user_val
                
                return redirect(url_for('logged_in'))
            else:
                if "username" in session:
                    return redirect(url_for("logged_in"))
                message = 'Wrong password'
                return render_template('login.html', message=message)
        else:
            message = 'User not found'
            return jsonify({"11":username})
            #return render_template('login.html', message=message)
    return jsonify({"111":"111"})
    #return render_template('login.html', message=message)


@app.route('/addcid', methods=["POST", "GET"])
def addcid():
    username = request.form.get("username")
    cid = request.form.get("cid")
    nonce = "non"
    vip = 0
    temp = 0
    dataB = db.test.find_one({"username": "ooppu","aid":'sadasd.wam'})
    if dataB is None:
        dataA = db.test.find({"username": "ooppu"})
        for item in dataA:
            temp = int(item['idcount'])
            temp +=1
    #user = db.test.find_one({"username": username})
            db.test.update(  {"username": username},{ '$push': { "aid": cid , "nonce": nonce , "vip": vip }})
            db.test.update({"username": username},{'$set':{"idcount": temp}})
            return jsonify({"yo":"add id success"})
    else:
        return jsonify({"yo":"dup id"})


@app.route("/logout", methods=["POST", "GET"])

def logout():
    if "email" in session:
        session.pop("email", None)
        return render_template("signout.html")
    else:
        return render_template('index.html')
#ไม่เกี่ยว
@app.route('/test', methods=['GET'])

def test():
    db.test.find
    return {"this is test":"testestestest"}
#ลบไอดีalien
#@app.route('/delaid', methods=['GET','POST'])
    
#def delaid():
    user = request.form.get("username")
    cid = request.form.get("cid")
    dataB = db.test.find({"username":user})
    for item in dataB :
        temp = str(item['aid'])
    try :
        db.test.aggregate( [ { "$project": { "matchedIndex": { "$indexOfArray": [ "$InstructorSubject", "MongoDB" ] } } } ] )
        db.test.update({'username':user},{ '$pull': { 'aid': cid } })
        
    except :
        return jsonify({'error:':'error'})
#showไอดีalien
@app.route('/showaid', methods=['GET','POST'])

def showaid():
    user = request.form.get("username")
    dataB = db.test.find({"username":user})
    for item in dataB :
        temp = str(item['aid'])
    return jsonify({'error:':temp})

@app.route('/pups', methods=['GET'])
def pups():
    return render_template('index.html')

if __name__ == '__main__':
     app.run(host='0.0.0.0',port=8080, debug=False)