import os
import pymysql
from dotenv import load_dotenv

class Database():
    def __init__(self):
        load_dotenv()
        self.conn = pymysql.connect(
            host=os.environ.get('DB_IP'),
            user=os.environ.get('DB_USER'),
            password=os.environ.get('DB_PASSWD'),
            db=os.environ.get('DB_NAME'),
            # charset='utf-8'
        )
        self.cur = self.conn.cursor()

    def select(self, command):
        result = ''
        try:
            self.cur.execute(command)
            result = self.cur.fetchall()
        except Exception as e:
            print('MySQL ERROR: {}'.format(e))
        return result

    def query(self, command):
        try:
            self.cur.execute(command)
            self.conn.commit()
        except Exception as e:
            print('MySQL ERROR: {}'.format(e))

    def close(self):
        self.cur.close()
        self.conn.close()
