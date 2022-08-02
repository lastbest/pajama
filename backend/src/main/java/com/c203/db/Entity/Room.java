package com.c203.db.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Room  {

    @OneToOne(cascade = CascadeType.ALL ,fetch = FetchType.LAZY)
    private RoomDeco roomDeco;

//    @ManyToOne(fetch = FetchType.LAZY)
//    private User user1;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int room_idx;

    private String room_host;
    private String room_name;
    private LocalDateTime room_date;
    private LocalDateTime room_opendate;
    private String room_link;

}
