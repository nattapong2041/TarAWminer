from flask import Flask, render_template, request,jsonify, url_for, redirect, session,Response
import pymongo
from pymongo import MongoClient
from hashlib import sha256
import json

from pymongo import message
client = MongoClient('mongodb://localhost:27017/dbtests')
db = client.dbtests


app = Flask(__name__)
app.secret_key = "super secret key"





@app.route("/register", methods=["POST", "GET"])

def register():
    if request.method == "POST":
        user = request.form.get("username")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        #if found in database showcase that it's found 
        user_found = db.test.find_one({"name": user})
        if user_found is not None:
            message = 'There already is a user by that name'
            return Response(message, status=500)
            #return render_template('index.html', message=message)
        if password1 != password2:
            message = 'Passwords should match!'
            return Response(message, status=500)
        else:
            #hash the password and encode it
            ###hashed = bcrypt.hashpw(password2.encode('utf-8'), bcrypt.gensalt())
            #assing them in a dictionary in key value pairs
            ###user_input = {'name': user, 'email': email, 'password': hashed}
            #insert it in the record collection
            try :db.test.insert_one(
            {
                'username': user,
                'password': password2,
            })
            except :
                return Response("duplicate id", status=500)
            
            #find the new created account and its email
            #user_data = db.tests.find_one({"email": email})
            #if registered redirect to logged in as the registered user
            return Response("regissuccess", status=200)
            #return render_template('logged_in.html', username=new_user)
    return Response("{'a':'b'}", status=500)

#@app.route('/logged_in')

#def logged_in():
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
    #if "username" in session:

     #   return jsonify({"123":"123"})
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
                #session["username"] = user_val
                message = 'Log in success'
                return Response(message, status=200)
            else:
                message = 'Wrong password'
                return Response(message, status=500)
        else:
            message = 'User not found'
            return Response(message, status=500)
            #return render_template('login.html', message=message)
    return Response(message, status=500)
    #return render_template('login.html', message=message)


@app.route('/addwid', methods=["POST", "GET"])
def addwid():
    username = request.form.get("username")
    wid = request.form.get("waxlist:")
    data = json.loads(wid)
    for i in range(len(data)) :
        dataB = db.test.find_one({"username": username,"wid":[{'id':data[i]}]})
        if dataB is None:
            db.test.update_one({'username' : username},{'$push':{'wid':{'id':data[i],'vip':"0"}}} )
            #dataA = db.test.find({"username": username})
            #for item in dataA:
            #    temp = int(item['idcount'])
            #    temp +=1
        #user = db.test.find_one({"username": username})
            #    db.test.update(  {"username": username},{ '$push': { "aid": cid , "nonce": nonce , "vip": vip }})
            #    db.test.update({"username": username},{'$set':{"idcount": temp}})
            #    return jsonify({"yo":"add id success"})
        else:
            message = 'already have id in this user'
            return Response(message, status=500)
    message = 'add wam successful'
    return Response(message, status=200)


#@app.route("/logout", methods=["POST", "GET"])

#def logout():
    if "email" in session:
        session.pop("email", None)
        return render_template("signout.html")
    else:
        return render_template('index.html')

#ลบไอดีalien
@app.route('/delaid', methods=['GET','POST'])
    
def delaid():
    user = request.form.get("username")
    cid = request.form.get("wid")
    dataB = db.test.find_one({"username": user,"wid":[{'id':cid}]})
    if dataB is None:
        db.test.update({'username' : user},{'$pull':{'wid':{'id':cid}}} )
        message = 'delete success'
        return Response(message, status=200)
    else:
        message = 'wam account not found'
        return Response(message, status=500) 


#update nonce
#@app.route('/wnonce', methods=['GET','POST'])
#def wnonce():
    non = request.form.get("nonce")
    user = request.form.get("user")
    wid = request.form.get("wid")
    dataB = db.test.find_one({"username": user,"wid":[{'id':wid}]})
    if dataB is None:
        return jsonify({'error':'erorrororo'})
    else:
        db.test.update_one({'$and': [{'username':user},{'wid.id': wid}]},{'$set':{'wid.$.nonce':non}})
        return jsonify({'success':"updatenon"})

@app.route('/getwam', methods=['GET','POST'])
def getwam():
    user = request.form.get('username')
    dataA = db.test.find_one({'username':user})
    if dataA is None:
        message = "error mai me wam"
        return Response(message, status=500)
        print(dataA['wid'])
    else :
        yo = dataA['wid']
        yoo = json.dumps(yo)
        return Response(yoo, status=200)

@app.route('/reqnonce', methods=['GET','POST'])
def reqnonce():
    wid = request.form.get("wid")
    dataA = db.testvip.find_one({"wam": wid })
    if dataA is None:
        message = 'no wam account in vip'
        return Response(message, status=500)
    else : 
        yo = dataA['nonce']
        yoo = json.dumps(yo)
        return Response(yoo, status=200)

#showไอดีalien
#@app.route('/showaid', methods=['GET','POST'])

#def showaid():
    user = request.form.get("username")
    dataB = db.test.find({"username":user})
    for item in dataB :
        temp = str(item['aid'])
    return jsonify({'error:':temp})

@app.route('/addvip', methods=['GET','POST'])
def addvip():
    username = request.form.get("username")
    wid = request.form.get("wid")
    code = request.form.get("code")
    dataB = db.test.find_one({"username": username,"wid.id":wid})
    if dataB is None:
        message= 'error'
        return Response(message, status=500)
    else :
        dataA = db.testcode.find_one({ 'hash': { '$regex': code } })
        if dataA is None:
            message = "wrong code"
            return Response(message, status=500)
        else:
            count = dataA['count']
            leng = len(dataA['wam'])
            if leng >= count :
                message = "vip code already full"
                return Response(message, status=500)
            else : 
                db.testcode.update_one({ 'hash': { '$regex': code } },{'$push':{'wam':'123.wam'}})
                db.test.update_one({'$and': [{'username':username},{'wid.id': wid}]},{'$set':{'wid.$.vip':1}})
                db.testvip.insert_one({'wam':wid,'nonce':'default',})
                message = "add vip succesful"
                return Response(message, status=500)

@app.route('/pups', methods=['GET'])
def pups():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080, debug=False)