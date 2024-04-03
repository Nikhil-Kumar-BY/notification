package com.workflow.notificationconsumer;

public class Message {
    private int userid;
    private String sender;

    private String content;
    private String timestamp;

    public Message() {
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Message(int userid,String sender, String content) {
        this.userid=userid;
        this.sender = sender;
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    @Override
    public String toString() {
        return "Message{" +
                ", userid='" + userid + '\'' +
                "sender='" + sender + '\'' +
                ", content='" + content + '\'' +

                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
