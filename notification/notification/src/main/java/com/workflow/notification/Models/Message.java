package com.workflow.notification.Models;


import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    private int userid;
    private String sender;
    private String role;
    public String starttime;
    public String endtime;
    private String jobRole;
    private String status;
    private String timestamp;

    @Override
    public String toString() {
        return "Message{" +
                "userid=" + userid +
                ", sender='" + sender + '\'' +
                ", role='" + role + '\'' +
                ", starttime='" + starttime + '\'' +
                ", endtime='" + endtime + '\'' +
                ", jobRole='" + jobRole + '\'' +
                ", status='" + status + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}

